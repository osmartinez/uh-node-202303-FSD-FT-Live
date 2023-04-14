const express = require('express')
const mongoose = require('mongoose')
const Alumno = require('./models/alumno.model')
const Asignatura = require('./models/asignatura.model')
const Profesor = require('./models/profesor.model')

const server = express()

const router = express.Router()

const cadenaConexion = "mongodb+srv://node:nbrNmyOWQdr7uhoq@cluster0.cpsdm.mongodb.net/universidad"

mongoose.connect(cadenaConexion)

const db = mongoose.connection

db.on('error', (error)=>{
    console.log(`Ha ocurrido un error`)
})

db.on('connected',()=>{
    console.log("Conectado a Mongo Atlas!")
})

// nos permite poder recibir peticiones POST en formato JSON
server.use(express.json())

server.use("/", router)

// req -> request -> peticion
// res -> response -> respuesta
router.get("/alumnos", async (req,res)=>{
    try{
        const alumnos = await Alumno.find()
        res.json(alumnos)
    }catch(error){
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.get("/alumnos/:dni", async (req,res)=>{
    try{
        const alumnos = await Alumno.findOne({dni: req.params.dni})
        res.json(alumnos)
    }catch(error){
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.post("/alumnos", async (req,res)=>{
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

router.patch("/alumnos/:id",async(req,res)=>{
    try {
        await Alumno.findByIdAndUpdate(req.params.id,req.body)
        res.json({msg: 'Alumno actualizado'})
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

// hacer lo mismo (GET asignaturas y POST asginaturas)
// para pdoer consultar y añadir asignaturas
router.get("/asignaturas", async (req,res)=>{
    try{
        const asignaturas = await Asignatura.find()
        res.json(asignaturas)
    }catch(error){
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.post("/asignaturas", async (req,res)=>{
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

router.delete("/asignaturas/:id",async (req,res)=>{
    try {
        //const resultado = await Asignatura.deleteOne({ _id: req.params.id })
        const resultado = await Asignatura.findByIdAndDelete(req.params.id)
        res.json({msg: resultado})
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.get("/profesores",async(req,res)=>{
    try {
        const resultado = await Profesor.find()
        res.json(resultado)
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})


router.post("/profesores",async(req,res)=>{
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

router.delete("/profesores/:id",async(req,res)=>{
    try {
        await Profesor.findByIdAndDelete(req.params.id)
        res.json({msg: "profesor eliminado correctamente!"})
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.put("/profesores/:id",async(req,res)=>{
    try {
        const resultado = await Profesor.replaceOne({_id: req.params.id},req.body)
        res.json(resultado)
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})

router.patch("/profesores/:id",async(req,res)=>{
    try {
        await Profesor.findByIdAndUpdate(req.params.id, req.body)
        res.json({msg: 'profesor actualizado parcialmente'})
    } catch (error) {
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})


server.listen(3000, ()=>{
    console.log(`Servidor online en puerto 3000`)
})