import { Router } from "express";
import { insertar, consultar, updateStatus, deleteSkater, consultarSkater, updateSkater } from "../models/usuarios.js";
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken'
import path from 'node:path'

const router = Router()


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
router.delete("/", async (req, res) => {
    try {
        const data = req.query
        const result = await deleteStaker(data)

        res.json({
            message: `Deleted user with mail ${data.email}`
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
        console.error(error)
    }
})
router.post("/login", async (req, res) => {
    try {
        // revisa si usuario existe
        const data = req.body
        const skater = await consultarSkater(data)
        console.log
        const payload = {
            email: skater.rows[0].email,
            nombre: skater.rows[0].nombre,
            anos_experiencia: skater.rows[0].anos_experiencia,
            especialidad: skater.rows[0].especialidad,
            estado: skater.rows[0].estado
        }
        const secret = process.env.JWT_SECRET
        const token = jwt.sign(payload, secret, { expiresIn: '1d' })
        res.json({
            token: token
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
        console.error(error)
    }
})
router.put("/", async (req, res) => {
    try {
        const data = req.body
        // Analiza si estado viene vacío y lo define falso
        if (!data.estado) {
            data.estado = false
        }

        const result = await updateSkater(data)

        console.log("RESULT", result)
        res.json({
            message: 'Updated skater',
            skater: result.rows
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
        console.error(error)
    }
})
export { router }