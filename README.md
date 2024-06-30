Proyecto Trainee de App Full Stack . 
La idea es crear un sitio que permita el registro de usuarios para participar en una competencia de Skate. 
La página Main Muestra los Skaters Registrados , y los usuarios al logear pueden modificar sus datos y eliminar su cuenta.
El admin tiene una ruta donde puede aprobar el registro ya que cada usuario parte sujeto a revisión.
Para esto se utilizo NodeJs Express Handlebars Jason-WebToken FileUpload Bootstrap Axios Cors Popper y PG para la base de datos. 
El Front No es muy agradable ya que esta por plantilla y se enfocó principalmente en la parte BACKEND, sin embargo en futuras actualizaciones se irá modificando.

Para ejecutar el proyecto es necesario:
1.-Antes de Iniciar el proyecto, crear Carpeta Photos dentro de la carpeta Static.
La ruta debe queda static/photos/
Las imagenes se suben al momento del registro de cada usuario.
2.-Crear una base de datos con las siguientes consultas :
CREATE DATABASE skatepark;
CREATE TABLE skaters (id SERIAL, email VARCHAR(50) NOT NULL, nombre
VARCHAR(25) NOT NULL, password VARCHAR(25) NOT NULL, anos_experiencia
INT NOT NULL, especialidad VARCHAR(50) NOT NULL, foto VARCHAR(255) NOT
NULL, estado BOOLEAN NOT NULL);
3.-Para conectar a la base de datos , se hace mediante un archivo .env dentro del folder del proyecto con la siguiente estructura:
DATABASE=skateparkExample
HOST=localhostExample
USERDB= UserExample
PASSWORD=passExample
PORT=5432example
JWT_SECRET = secretExample
4.-Instalar las dependencias o frameworks utilizados . Se pueden revisar en el Archivo Package o bien instalar con el comando npm i package en la consola.
5.-Para correr el progama, ingresa en la consola el siguiente comando npx nodemon --env-file=.env index.js . En caso de que hayas instalado todas las dependencias incluyendo nodemon.
