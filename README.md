# Bienvenido

Esta es una implementación de la [API de JWPlayer V1][jwplayer-api-v1] la cual automatiza las llamadas e implementa un control de errores bien manejado.

## Instalación

```bash
yarn add @zerointermittency/jwplayer
# npm i --save @zerointermittency/jwplayer
```

## Utilización

- Se utiliza la misma estructura que la [documentación de la API][api-v1].
- Si el servicio necesita parametros estos son pasadon como un objeto y se escriben exactamente igual como en la documentación.

Ejemplo:
```javascript
const ZIJWPlayer = require('@zerointermittency/jwplayer'),
    Client = ZIJWPlayer.Client;

// El cliente puede ser el por defecto del paquete o se puede utilizar uno personalizado
const client = new Client(API_KEY, API_SECRET),
    jwplayer = new ZIJWPlayer(client);

jwplayer.v1.status()
    .then((data) => {
        console.info('data', require('util').inspect(data, false, 10, true));
    })
    .catch((error) => {
        console.log(error.name);
        console.log(error.message);
    });

jwplayer.v1.accounts.show()
    .then((data) => {
        console.info('data', require('util').inspect(data, false, 10, true));
    })
    .catch((error) => {
        console.log(error.name);
        console.log(error.message);
    });

jwplayer.v1.videos.create({
        title: 'archivo de prueba',
        author: 'ZIJWPlayer',
        download_url: 'http://zi.s3.amazonaws.com/jwplayer-test/BigBuckBunny_512kb.mp4',
    })
    .then((data) => {
        console.info('data', require('util').inspect(data, false, 10, true));
    })
    .catch((error) => {
        console.log(error.name);
        console.log(error.message);
    });

jwplayer.v1.videos.show({video_key: 'VQGqnyac'})
    .then((data) => {
        console.log(require('util').inspect(data, false, 10, true));
        return jwplayer.v1.videos.conversions.list({video_key: 'VQGqnyac'});
    })
    .then((data) => {
        console.log(require('util').inspect(data, false, 10, true));
    })
    .catch((error) => {
        console.log(error.name);
        console.log(error.message);
    });
```

# API V1: Consideraciones

## Videos

### Create

#### Parametro: download_url
Desafortunadamente no se pueden subir archivos desde el S3 con HTTPS ya que actualmente el certificado de este protocolo arroja que no es seguro por lo que al parecer JWPlayer no descarga correctamente el video, por esto hay que usar HTTP. Lo ideal es que la URL se genere con [permisos temporales][s3-signed-url] para no dejar expuesto el contenido de manera indefinida al dejarlo como publico.

## Status
Actualmente no funciona debido a que JWPlayer esta devolviendo un texto plano, esta ignorando el parametro `api_format` de XML o JSON lo cual no concuerda con la [documentación][api-v1-status] y de hecho esta ignorando todos los parametros, ya que la siguiente URL https://api.jwplatform.com/v1/status devuelve lo siguiente:

```
status: ok
resource: api-server
timestamp: 1519053862
version: api-v1.62.0
access_mode: read-write
maintenance: False
```

# Ejemplos

- [Subir cualquier archivo al S3 de amazon desde un formulario web][example-s3-upload-file]

[jwplayer-api-v1]: https://developer.jwplayer.com/jw-platform/reference/v1/index.html
[s3-signed-url]: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property
[api-v1]: https://developer.jwplayer.com/jw-platform/reference/v1
[api-v1-status]: https://developer.jwplayer.com/jw-platform/reference/v1/methods/status.html
[example-s3-upload-file]: example/s3-upload-file/