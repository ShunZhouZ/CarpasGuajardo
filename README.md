# CarpasGuajardo

Proyecto Ingenieria de Software

## Instrucciones Debian/Ubuntu

1. Instalar npm
2. Instalar node (16.8.0 o superior)
3. correr `npm install`

NOTA: si hay errores en correr `npm install ` o `npm install --force` correr `sudo npm install -g npm` y reintentar

4. correr el servidor con `npm run dev`

#Carpetas
En la carpeta "pages" hay carpetas que representan una sección de la página. Por ejemplo, en eventos está la parte de visualizar eventos, también podría ir crear eventos, etc.

Dentro de la carpeta "api" se colocan las consultas a la db, debe ir un archivo por cada collection y en cada archivo todas las consultas asociadas a esa collection. Por ejemplo, en eventos.js hay un post (de prueba, porque aún no está listo el real) y un get.

#Archivo copiarypegar.js
Sirve para crear las pages(sección de la página), es como un template.

#Comandos git
Para actualizar rama:
`git pull origin <nombre de rama>`

Para subir modificaciones:

1. `git add .`

2. `git commit -m "<comentario>"`

3. `git push origin <nombre de rama>`

\*\*comentario puede ser: actualizacion de login-mati

## Instrucciones instalar Moments.js (es una biblioteca de JavaScript que se utiliza para manejar, analizar y formatear fechas y horas en el navegador y en el servidor)
1.npm install moment --save   // npm
