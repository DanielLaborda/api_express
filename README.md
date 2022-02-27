# Api Daniel Laborda prueba GGTECH

Proyecto realizado para la prueba tecnica Backend para ggtech realizado en Nodejs con framework Expres en typescript. 

---

## Comandos para arrancar la API en localhost
Comando pendiente al cambio del archivos Typescript en scr:
```sh
npm run ts
```
Comando pendiente en los cambios de javascript de la carpeta build:
```sh
npm run ts
```
Comando que ejecutara en producción:
```sh
npm run start
```

## Endpoints
CRUD de película:

**Crear pelicula**
Para crear una pelicula y que valide la pelicula por titulo si existe o no, consultando desde la api se almacenara: `Image`, `Title` y `Director`:
> Note: Esta información se obtendra del json de entrada.
> Note (Admistración): Se debe cambiar el campo url en la función "createMovie" el el fichero "MovieRoutes.ts" para cambia a nuestra API externa.

para usar este endpoint se llamará a la API con:
```sh
POST/ http://localhost:3000/api/movies/
```

**Al mostrar una película por ID se deben mostrar las reseñas por plataforma**
para usar este endpoint se llamará a la API con:
```sh
GET/ http://localhost:3000/api/movies/"ID"
```

**Crear reseña de una película**
para usar este endpoint se llamará a la API con:
```sh
POST/ http://localhost:3000/api/movies/createReview/"ID de la pelicula"
```

## Modulos
Modulos utilizados e instalados en el proyecto para funcionamiento correcto de la API.
- [Express] - Framework
- [mongoose] - Modulo para conectarnos con mongodb.
- [morgan] - Permitira ver las peticiones que van llegando por consola.
- [helmet] - Modulo para la seguridad.
- [cors] - Modulo que nos permitira si despues queremos conectarnos con una aplicacion web.
- [compresion] - Modulo para reducir la respuesta del backend.
- [nodemon] - Modulo de refresco con cada cambio de nuestro codigo.
- [typescript] - Modulo para tyscript.
- [mongoose-paginate-ts] - Modulo para paginar.

**Complementos de typescript desde backend**
- @types/node
- @types/mongoose
- @types/express
- @types/morgan
- @types/helmet
- @types/compression
- @types/cors 


## License
MIT