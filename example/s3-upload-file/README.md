# s3-upload-file

Ejemplo de formulario para subir contenido al S3 directamente.

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## AWS documentation

- [Browser-based uploads using POST](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-UsingHTTPPOST.html)
    - [Creating HTML form](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-HTTPPOSTForms.html)
    - [Creating POST policy](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-HTTPPOSTConstructPolicy.html)
    - [Upload examples](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html)
- [Signature V4 examples](https://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html#signature-v4-examples-javascript)
- [AWS Regions](https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region)
- [Form fields](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPOST.html)
- [Storage class](https://docs.aws.amazon.com/AmazonS3/latest/dev/ChgStoClsOfObj.html)

## Archivo de configuración

El archivo debe ir en en la carpeta principal del projecto con el nombre `config.json` y el ejemplo de los parametros que contiene este estan en el archivo [configSample.json](example/s3-upload-file/configSample.json)

## Habilitar CORS en el S3

Entrar a Permissions->CORS configuration y pegar este fragmento, remplazando el `AllowedOrigin` por el propio:
```
<CORSRule>
   <AllowedOrigin>http://localhost:8080</AllowedOrigin>
   <AllowedMethod>POST</AllowedMethod>
   <AllowedHeader>*</AllowedHeader>
</CORSRule>
```

Debería quedar algo así:
```
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Authorization</AllowedHeader>
    </CORSRule>
    <CORSRule>
       <AllowedOrigin>http://localhost:8080</AllowedOrigin>
       <AllowedMethod>POST</AllowedMethod>
       <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```