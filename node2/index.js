const express = require('express')
const {readFileSync, writeFileSync, writeSync} = require('fs')
const miServidor = express()
const peliculas = require('./db/movies.json')
const libros = require('./db/books.json')
const pacientes = require('./db/pacientes.json')

const router = express.Router()

miServidor.use(express.text())

router.get('/alumnos',(peticion,respuesta)=>{
    respuesta.status(200)
    const texto = readFileSync("./db/alumnos.txt").toString()
    respuesta.send(texto)
})

router.post('/alumnos',(peticion,respuesta)=>{
    respuesta.status(200)
    console.log(peticion.body)
    writeFileSync("./db/alumnos.txt", ","+peticion.body, {flag: 'a+'})
    respuesta.send('Alumno añadido correctamente!')
})

router.delete('/alumnos/:nombre',(peticion,respuesta)=>{
    respuesta.status(200)
    let texto = readFileSync("./db/alumnos.txt").toString()
    texto = texto.replace(peticion.params.nombre, "")
    writeFileSync("./db/alumnos.txt", texto)
    respuesta.send('Alumno eliminado correctamente')
})

router.get('/movies',(peticion,respuesta)=>{
    // year, title, actors
    console.log(peticion.query)

    let peliculasFiltradas = peliculas
    
    if(peticion.query.year){
        peliculasFiltradas = peliculasFiltradas.filter(m=>m.Year === peticion.query.year)
    }

    if(peticion.query.title){
        peliculasFiltradas = peliculasFiltradas.filter(m=>m.Title.includes(peticion.query.title))
    }

    if(peticion.query.actors){
        peliculasFiltradas = peliculasFiltradas.filter(m=>m.Actors.includes(peticion.query.actors))
    }

    respuesta.status(200)
    //const texto = readFileSync("./db/movies.json").toString()
    respuesta.json(peliculasFiltradas)
})

router.get('/books/:titulo',(peticion,respuesta)=>{
    console.log(peticion.params)
    respuesta.status(200)
    respuesta.json(libros.find(b=>b.title===peticion.params.titulo))
})

router.get('/books',(peticion,respuesta)=>{

    respuesta.status(200)
    let librosFiltrados = libros

    if(peticion.query.country){
        librosFiltrados = librosFiltrados.filter(x=>x.country === peticion.query.country)
    }

    if(peticion.query.author){
        librosFiltrados = librosFiltrados.filter(x=>x.author===peticion.query.author)
    }
   
    respuesta.json(librosFiltrados)
})



router.get('/pacientes/:dni',(peticion,respuesta)=>{
    const pacienteEncontrado = pacientes.find(x=>x.dni === peticion.params.dni.toUpperCase())
    if(pacienteEncontrado){
        respuesta.status(200)
        respuesta.json(pacienteEncontrado)
    }
    else{
        respuesta.status(404)
        respuesta.json({msg: "Paciente no encontrado con ese DNI"})
    }

})


router.get('/pacientes',(peticion,respuesta)=>{
    console.log("soy GET")
    respuesta.status(200)
    respuesta.json(pacientes)
})

router.post('/pacientes',(peticion,respuesta)=>{
    console.log("soy POST")
    respuesta.status(200)
    respuesta.json(pacientes)
})



// configurar el servidor para que use el ROUTER
miServidor.use('/',router)


miServidor.listen(3000, ()=>{
    console.log(`Servidor express levantado en puerto 3000`)
})