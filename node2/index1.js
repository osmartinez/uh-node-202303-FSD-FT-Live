const http = require('http')


function manejarPeticion(peticion, respuesta){
    respuesta.setHeader("Content-Type", "application/json")

    if(peticion.url === "/login"){
        respuesta.writeHead(404)
        respuesta.end("404 NOT FOUND")
    }
    else if(peticion.url=== "/users"){
        respuesta.writeHead(200)
        respuesta.end("ENDPOINT DE USUARIOS")

    }
    else if(peticion.url === "/logout"){

    }
}

const miServidor = http.createServer(manejarPeticion)

miServidor.listen(3000, ()=>{
    console.log(`Servidor levantado en puerto 3000`)
})