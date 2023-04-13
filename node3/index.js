const express = require('express')
const mongoose = require('mongoose')
const Alumno = require('./models/alumno.model')
const Asignatura = require('./models/asignatura.model')

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
        res.status(500)
        res.json({msg: 'Ha ocurrido un error inesperado'})
    }
})



server.listen(3000, ()=>{
    console.log(`Servidor online en puerto 3000`)
})