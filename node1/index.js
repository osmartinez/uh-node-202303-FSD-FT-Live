import { writeFileSync, readFileSync } from 'fs'
import { createServer } from 'http'

const puerto = 3000

function manejarPeticiones(peticion, respuesta) {
    // tipo de mensaje
    //respuesta.setHeader("Content-Type", "text/html")
    respuesta.setHeader("Content-Type", "application/json")

    if (peticion.url.includes("home")) {
        // codigo de error / exito
        respuesta.writeHead(200)
        // mensaje
        respuesta.end("<h1>Mi servidor | Home</h1>")
    }
    else if(peticion.url.includes("login")){
         // codigo de error / exito
         respuesta.writeHead(200)
         // mensaje
         respuesta.end("<h1>Mi servidor | Login</h1>")
    }
    else if(peticion.url.includes("alumnos")){
        // codigo de error / exito
        respuesta.writeHead(200)
        const misAlumnos = readFileSync("alumnos.json")
        // mensaje
        respuesta.end(`${misAlumnos}`)
   }
    else if(peticion.url.includes("area-privada")){
        // codigo de error / exito
        respuesta.writeHead(403)
        // mensaje
        respuesta.end("<h1>Forbidden</h1>")
   }
    else{
         // codigo de error / exito
         respuesta.writeHead(404)
         // mensaje
         respuesta.end("<h1>Not found</h1>")
    }
   

}

// crear
const server = createServer(manejarPeticiones)

// lanzar el servidor en el puerto
server.listen(puerto, () => {
    console.log(`El servidor está levantado en el puerto ${puerto}`)
})

