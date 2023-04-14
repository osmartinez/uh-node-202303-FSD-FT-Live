const Asignatura = require('../models/asignatura.model')
const express = require('express')
const router = express.Router()

// hacer lo mismo (GET asignaturas y POST asginaturas)
// para pdoer consultar y añadir asignaturas
router.get("/", async (req,res)=>{
    try{
        const asignaturas = await Asignatura.find()
        res.json(asignaturas)
    }catch(error){
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.post("/", async (req,res)=>{
    try {
        const nuevaAsignatura = new Asignatura({
            nombre: req.body.nombre,
        })
        await nuevaAsignatura.save()
        res.json(nuevaAsignatura)
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.delete("/:id",async (req,res)=>{
    try {
        //const resultado = await Asignatura.deleteOne({ _id: req.params.id })
        const resultado = await Asignatura.findByIdAndDelete(req.params.id)
        res.json({msg: resultado})
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

module.exports = router

