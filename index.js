const express = require('express')
const exphbs = require('express-handlebars')
var handlebars = require('express-handlebars');
const cors = require('cors')
clearTimeout
const expressFileUpload = require("express-fileupload");

const app = express()

app.listen(3000, () => {
    console.log("App escuchando el puerto 3000")
})


const { insertar, consultar } = require('./modules/usuarios.js')

var bodyParser = require('body-parser');
const { default: test } = require('node:test');

app.use(
    expressFileUpload({
        limits: { fileSize: 10000000 },
        abortOnLimit: true,
        responseOnLimit:
            "El peso de la cancion que intentas subir supera el limite permitido",
    })
);
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Configurar motor de vistas

app.set("view engine", "handlebars")
app.engine("handlebars", exphbs.engine())
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"))
app.use("/popper", express.static(__dirname + "/node_modules/@popperjs/core/dist/umd"))

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/admin", (req, res) => {
    res.render("admin")
})
app.get("/Registro", (req, res) => {
    res.render("Registro"), {
        test: req.body
    }
})
app.post("/Registro", async (req, res) => {
    res.render("Registro"), {
        data: req.body
    }
    const payload = req.body;
    const { foto } = req.files;
    const { name } = foto;
    foto.mv(`${__dirname}/archivos/${name}`, (err) => {
        res.send("Archivo cargado con éxito");
    });
    const rutaFoto = `./archivos/${name}`

    const response = await insertar(payload, rutaFoto)
    res.send(response.rows)
})

app.get("/usuarios", async (req, res) => {
    try {
        const response = await consultar()
        res.send(response.rows)
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.json({ error: "Algo salió mal" })
    }
})

