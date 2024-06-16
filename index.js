const express = require('express')
const exphbs = require('express-handlebars')
var handlebars = require('express-handlebars');
const cors = require('cors')
const app = express()

app.listen(3000, () => {
    console.log("App escuchando el puerto 3000")
})
const { insertar } = require('./modules/usuarios.js')

var bodyParser = require('body-parser');
const { default: test } = require('node:test');

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
        test: req.body
    }
    const payload = req.body
    const response = await insertar(payload)
    res.send(response.rows)
})

