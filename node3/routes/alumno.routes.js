const express = require('express')
const router = express.Router()
const { obtenerTodos, obtenerPorDNI, crear, modificar } = require('../controllers/alumno.controller')

// req -> request -> peticion
// res -> response -> respuesta
router.get("/", async (req,res)=>{
    try{
        const alumnos = await obtenerTodos()
        res.json(alumnos)
    }catch(error){
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.get("/:dni", async (req,res)=>{
    try{
        const alumno = await obtenerPorDNI(req.params.dni)
        res.json(alumno)
    }catch(error){
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.post("/", async (req,res)=>{
    try {
        const nuevoAlumno = await crear(req.body)
        res.json(nuevoAlumno)
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({msg: error})
    }
})

router.patch("/:id",async(req,res)=>{
    try {
        await modificar(req.params.id,req.body)
        res.json({msg: 'Alumno actualizado'})
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

module.exports = router



