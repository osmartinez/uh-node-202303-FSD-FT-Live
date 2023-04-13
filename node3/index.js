const express = require('express')
const mongoose = require('mongoose')

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
router.get("/alumnos", (req,res)=>{
    console.log('PETICION RECIBIDA EN /ALUMNOS')
    res.json({msg: 'funciona!'})
})

server.listen(3000, ()=>{
    console.log(`Servidor online en puerto 3000`)
})