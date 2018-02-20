<template>
  <div class="container">
    <h2>S3 upload file</h2>
    <form :action="bucket" method="post" enctype="multipart/form-data">
      <h3>Campos que deben ir ocultos</h3>
      <div class="form-group">
        <label>Key to upload:</label>
        <input class="form-control" type="input" name="key" v-model="key" />
      </div>

      <div class="form-group">
        <label>X-Amz-Meta-Uuid:</label>
        <input class="form-control" type="text" name="X-Amz-Meta-Uuid" v-model="XAmzMetaUuid" />
      </div>

      <div class="form-group">
        <label>X-Amz-Credential:</label>
        <input class="form-control" type="text" name="X-Amz-Credential" v-model="XAmzCredential" />
      </div>

      <div class="form-group">
        <label>X-Amz-Date:</label>
        <input class="form-control" type="text" name="X-Amz-Date" v-model="XAmzDate" />
      </div>

      <div class="form-group">
        <label>Policy:</label>
        <input class="form-control" type="text" name="Policy" v-model='Policy' />
      </div>

      <div class="form-group">
        <label>X-Amz-Signature:</label>
        <input class="form-control" type="text" name="X-Amz-Signature" v-model="XAmzSignature" />
      </div>

      <div class="form-group">
        <label>X-Amz-Algorithm:</label>
        <input class="form-control" type="text" name="X-Amz-Algorithm" v-model="XAmzAlgorithm" />
      </div>

      <div class="form-group">
        <label>X-Amz-Server-Side-Encryption:</label>
        <input class="form-control" type="text" name="X-Amz-Server-Side-Encryption" v-model="XAmzServerSideEncryption" />
      </div>

      <div class="form-group">
        <label>ACL:</label>
        <input class="form-control" type="text" name="acl" v-model="acl" />
      </div>
      <div v-html="status"></div>
      <h3>Único campo visible</h3>
      <div class="form-group">
        <label>File:</label>
        <input class="form-control-file" type="file" name="file" @change="fileToUpload = $event.target.files[0]" />
      </div>
      <input class="btn btn-primary" type="submit" name="submit" value="Upload to Amazon S3" @click.prevent="submitted" :disabled="submitDisabled" />
      <span>{{ uploadProgress }}</span>
    </form>
  </div>
</template>

<script>
  import Crypto from "crypto-js";
  import moment from "moment";
  import uuid from "uuid";
  import axios from "axios";
  import FormData from "form-data";
  import { parseSync } from "xml-reader";
  import Q from 'xml-query';
  import config from "../config.json";

  const defaultValues = {
    acl: "private",
    XAmzServerSideEncryption: "AES256",
    XAmzAlgorithm: "AWS4-HMAC-SHA256",
    AWSSignatureVersion: "AWS4",
    service: "s3",
  };

  const now = moment().utc(),
    date = now.format("YYYYMMDD"),
    dateIsoFormat = now.format('YYYYMMDDTHHmmss') + 'Z',
    XAmzCredential = `${config.aws_access_key}/${date}/${config.aws_region}/${defaultValues.service}/aws4_request`,
    uuid4 = uuid.v4();

  let stringToSign = {
    "expiration": now.add(2, "days").toISOString(),
    "conditions": [
      {"bucket": config.s3_bucket},
      ["starts-with", "$key", config.s3_bucket_start_with],
      ["content-length-range", 1048579, 10485760], // file size from 1 to 10 Mb
      {"acl": defaultValues.acl},
      {"x-amz-meta-uuid": uuid4},
      {"x-amz-server-side-encryption": defaultValues.XAmzServerSideEncryption},
      {"x-amz-credential": XAmzCredential},
      {"x-amz-algorithm": defaultValues.XAmzAlgorithm},
      {"x-amz-date": dateIsoFormat }
    ]
  };
  stringToSign = new Buffer(JSON.stringify(stringToSign), 'utf-8').toString('base64');

  const dateKey = Crypto.HmacSHA256(date, defaultValues.AWSSignatureVersion + config.aws_secret_key),
    dateRegionKey = Crypto.HmacSHA256(config.aws_region, dateKey),
    dateRegionServiceKey = Crypto.HmacSHA256(defaultValues.service, dateRegionKey),
    signingKey = Crypto.HmacSHA256("aws4_request", dateRegionServiceKey),
    XAmzSignature = Crypto.HmacSHA256(stringToSign, signingKey);

  export default {
    name: "app",
    data () {
      return {
        "XAmzSignature": XAmzSignature,
        "XAmzCredential": XAmzCredential,
        "XAmzDate": dateIsoFormat,
        "XAmzMetaUuid": uuid4,
        "XAmzServerSideEncryption": defaultValues.XAmzServerSideEncryption,
        "XAmzAlgorithm": defaultValues.XAmzAlgorithm,
        "acl": defaultValues.acl,
        "Policy": stringToSign,
        "bucket": `http://${config.s3_bucket}.s3.amazonaws.com/`,
        "key": config.s3_bucket_file_path,
        "fileToUpload": "",
        "submitDisabled": false,
        "uploadProgress": "",
        "status": "",
      };
    },
    methods: {
      submitted() {
        this.submitDisabled = true;
        const formData = new FormData();

        formData.append("key", this.key);
        formData.append("X-Amz-Meta-Uuid", this.XAmzMetaUuid);
        formData.append("X-Amz-Credential", this.XAmzCredential);
        formData.append("X-Amz-Date", this.XAmzDate);
        formData.append("Policy", this.Policy);
        formData.append("X-Amz-Signature", this.XAmzSignature);
        formData.append("X-Amz-Algorithm", this.XAmzAlgorithm);
        formData.append("X-Amz-Server-Side-Encryption", this.XAmzServerSideEncryption);
        formData.append("acl", this.acl);
        formData.append("file", this.fileToUpload);

        axios.post(this.bucket, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              this.uploadProgress = `Uploaded ${((progressEvent.loaded/progressEvent.total)*100).toFixed(2)}%`;
            },
        })
          .then((response) => {
            let text = '';
            if (response.status === 204) {
              text = "Se subio correctamente el archivo al S3";
            } else {
              text = `Status code: ${response.status}  - Data: ${response.data}`;
            }
            this.status = `<div class="alert alert-success alert-dismissible fade show" role="alert">${text}</div>`;
            this.submitDisabled = false;
          })
          .catch((error) => {
            const ast = parseSync(error.response.data, {
                parentNodes: false,
              }),
              xml = Q(ast),
              code = xml.find('Code').text(),
              message = xml.find('Message').text();

            this.status = `<div class="alert alert-danger alert-dismissible fade show" role="alert"><h3>Code: ${code}</h3><p>Status code: ${error.response.status}</p><p>Message: ${message}</p></div>`;
            this.submitDisabled = false;
          });
      },
    },
  };
</script>
