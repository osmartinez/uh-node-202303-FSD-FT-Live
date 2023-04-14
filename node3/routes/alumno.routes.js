const Alumno = require('../models/alumno.model')
const express = require('express')
const router = express.Router()

// req -> request -> peticion
// res -> response -> respuesta
router.get("/", async (req,res)=>{
    try{
        const alumnos = await Alumno.find()
        res.json(alumnos)
    }catch(error){
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.get("/:dni", async (req,res)=>{
    try{
        const alumnos = await Alumno.findOne({dni: req.params.dni})
        res.json(alumnos)
    }catch(error){
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.post("/", async (req,res)=>{
    try {
        const nuevoAlumno = new Alumno({
            nombre: req.body.nombre,
            dni: req.body.dni,
            edad: req.body.edad
        })
        await nuevoAlumno.save()
        res.json(nuevoAlumno)
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({msg: error})
    }
})

router.patch("/:id",async(req,res)=>{
    try {
        await Alumno.findByIdAndUpdate(req.params.id,req.body)
        res.json({msg: 'Alumno actualizado'})
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

module.exports = router



