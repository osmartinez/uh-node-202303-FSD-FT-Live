
const express = require('express')
const router = express.Router()

const {obtenerTodos, borrar, crear} = require('../controllers/asignatura.controller')

// hacer lo mismo (GET asignaturas y POST asginaturas)
// para pdoer consultar y añadir asignaturas
router.get("/", async (req,res)=>{
    try{
        const asignaturas = await obtenerTodos()
        res.json(asignaturas)
    }catch(error){
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.post("/", async (req,res)=>{
    try {
        const nuevaAsignatura = await crear(req.body)
        res.json(nuevaAsignatura)
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.delete("/:id",async (req,res)=>{
    try {
        //const resultado = await Asignatura.deleteOne({ _id: req.params.id })
        const resultado = await borrar(req.params.id)
        res.json({msg: resultado})
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

module.exports = router

