import { Router } from "express";
import { insertar, consultar, updateStatus } from "../models/usuarios.js";
import { fileURLToPath } from 'url';
import path from 'node:path'

const router = Router()

router.get("/", (req, res) => {
    res.render("index")
})
router.get("/login", (req, res) => {
    res.render("login")
})
router.get("/admin", (req, res) => {
    res.render("admin")
})
router.get("/Registro", (req, res) => {
    res.render("Registro")
})

router.post("/Registro", async (req, res) => {
    try {
        const payload = req.body;
        const { foto } = req.files;
        const { name } = foto;
        const photoURL = path.join(import.meta.dirname, "../static/photos", name)
        foto.mv(photoURL)
        const response = await insertar(payload, name)
        res.send(response.rows)

    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.json({ error: "Algo salió mal" })
    }
})

router.get("/usuarios", async (req, res) => {
    try {
        const response = await consultar()
        res.send(response.rows)
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.json({ error: "Algo salió mal" })
    }
})
router.put("/admin", async (req, res) => {
    try {
        const id = req.body.id;
        const response = await updateStatus(id)
        res.send(response.rows)

    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.json({ error: "Algo salió mal" })
    }
})



export { router }