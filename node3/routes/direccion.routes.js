const {crear, obtenerTodos, modificar} = require('../controllers/direccion.controller')

const express = require('express')
const router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const direcciones = await obtenerTodos()
        res.json(direcciones)
    }catch(error){
        res.status(500)
        res.json({msg: String(error)})
    }
})

router.post('/', async(req,res)=>{
    try {
        const nueva = await crear(req.body)
        res.json(nueva)
    } catch (error) {
        res.status(500)
        res.json({msg: String(error)})
    }
})


router.patch("/:id", async(req,res)=>{
    try {
        const result = await modificar(req.params.id, req.body)
        res.json(result)
    } catch (error) {
        res.status(500)
        res.json({msg: String(error)})
    }
})

module.exports = router

