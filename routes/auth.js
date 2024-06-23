import { Router } from "express";
import { consultarSkater } from "../models/usuarios.js";
import jwt from 'jsonwebtoken'
import path from 'node:path'

const router = Router()


export { router }