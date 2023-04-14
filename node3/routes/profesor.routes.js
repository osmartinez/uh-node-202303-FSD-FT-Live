
const express = require('express')
const router = express.Router()
const { obtenerTodos,
    crear,
    borrar,
    reemplazar,
    modificar } = require('../controllers/profesor.controller')
router.get("/", async (req, res) => {
    try {
        const resultado = await obtenerTodos()
        res.json(resultado)
    } catch (error) {
        res.status(500)
        res.json({ msg: 'Ha ocurrido un error inesperado' })
    }
})


router.post("/", async (req, res) => {
    try {
        const nuevoProfe = await crear(req.body)
        res.json(nuevoProfe)
    } catch (error) {
        res.status(500)
        res.json({ msg: 'Ha ocurrido un error inesperado' })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await borrar(req.params.id)
        res.json({ msg: "profesor eliminado correctamente!" })
    } catch (error) {
        res.status(500)
        res.json({ msg: 'Ha ocurrido un error inesperado' })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const resultado = await reemplazar(req.params.id, req.body)
        res.json(resultado)
    } catch (error) {
        res.status(500)
        res.json({ msg: 'Ha ocurrido un error inesperado' })
    }
})

router.patch("/:id", async (req, res) => {
    try {
        await modificar(req.params.id, req.body)
        res.json({ msg: 'profesor actualizado parcialmente' })
    } catch (error) {
        res.status(500)
        res.json({ msg: 'Ha ocurrido un error inesperado' })
    }
})

module.exports = router

