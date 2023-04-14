const Profesor = require('../models/profesor.model')
const express = require('express')
const router = express.Router()

router.get("/",async(req,res)=>{
    try {
        const resultado = await Profesor.find()
        res.json(resultado)
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})


router.post("/",async(req,res)=>{
    try {
        const nuevoProfe = new Profesor({
            nombre: req.body.name,
            apellidos: req.body.lastname,
        })
        await nuevoProfe.save()
        res.json(nuevoProfe)
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        await Profesor.findByIdAndDelete(req.params.id)
        res.json({msg: "profesor eliminado correctamente!"})
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const resultado = await Profesor.replaceOne({_id: req.params.id},req.body)
        res.json(resultado)
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.patch("/:id",async(req,res)=>{
    try {
        await Profesor.findByIdAndUpdate(req.params.id, req.body)
        res.json({msg: 'profesor actualizado parcialmente'})
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

module.exports = router

