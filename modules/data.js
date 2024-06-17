const axios = require('axios')
const express = require('express')
const app = express()

const leer = async () => {
    app.get("/test", (req, res) => {
        const url = "localhost:3000/usuarios"

        axios
            .get(url)
            .then(({ data }) => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
                res.send("Problemas al conseguir la data, intentalo de nuevo")
            })
    })
}
module.exports = { leer }