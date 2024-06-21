import { Router } from "express";
import { consultarSkater } from "../models/skaters.js";
import jwt from 'jsonwebtoken'
import path from 'node:path'

const router = Router()

// Login
router.post("/login", async (req, res) => {
    try {
        // revisa si usuario existe
        const data = req.body
        const skater = await consultarSkater(data)
        if (skater.rowCount == 0) {
            res.status(404).json({
                message: 'User no existe o password incorrecto'
            })
        } else {
            if (req.body.password != skater.rows[0].password) {
                res.status(400).json({
                    message: 'User no existe o password incorrecto'
                })
            } else {
                // firmamos JWT
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
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
        console.error(error)
    }
})
export { router }