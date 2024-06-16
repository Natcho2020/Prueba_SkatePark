const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
app.listen(3000, () => {
    console.log("App escuchando el puerto 3000")
})

// 3.- Configurar motor de vistas
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
app.get("/datos", (req, res) => {
    res.render("datos")
})
app.get("/Registro", (req, res) => {
    res.render("Registro")
})