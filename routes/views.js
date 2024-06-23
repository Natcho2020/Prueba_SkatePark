import { Router } from "express";
import { Authorization } from "../middlewares/authorization.js";
const router = Router()

router.get("/login", (req, res) => {
    res.render("login")
})
router.get("/", (req, res) => {
    res.render("index")
})
router.get("/admin", (req, res) => {
    res.render("admin")
})
router.get("/Registro", (req, res) => {
    res.render("Registro")
})
router.get("/datos", Authorization, async (req, res) => {
    const decoded = req.decoded
    console.log(decoded)
    res.render("datos", {
        skater: decoded
    })
})



export { router }