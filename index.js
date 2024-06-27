import express from 'express'
import fileUpload from 'express-fileupload'
import { engine } from 'express-handlebars'
// importar rutas
import { router as views } from './routes/views.js'
import { router as skaters } from './routes/skaters.js'

const app = express()

// middleware para subir archivos
app.use(fileUpload())
// middleware para aceptar json
app.use(express.json())
// Archivos estáticos
app.use(express.static('static'))
// Motor de vistas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// registrar rutas

app.use("/", skaters)
app.use("/", views)



app.listen(3000, () => { console.log("App escuchando el puerto 3000") })
