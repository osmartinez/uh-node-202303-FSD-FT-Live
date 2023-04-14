const Profesor = require('../models/profesor.model')


async function obtenerTodos(){
    return await Profesor.find()
}

async function crear(body){
    const nuevo = new Profesor({
        nombre: body.nombre,
        apellidos: body.apellidos
    })
    await nuevo.save()
    return nuevo
}

async function borrar(id){
    const resultado = await Profesor.findByIdAndDelete(id)
    return resultado
}

async function reemplazar(id, body){
    const resultado = await Profesor.replaceOne({_id: id}, body)
    return resultado
}

async function modificar(id, body){
    const resultado = await Profesor.findByIdAndUpdate(id, body)
    return resultado
}

module.exports = {
    obtenerTodos,
    crear,
    borrar,
    reemplazar,
    modificar
}