const Asignatura = require('../models/asignatura.model')

async function obtenerTodos(){
    const asignaturas = await Asignatura.find()
    return asignaturas
}

async function crear(body){
    const nuevaAsignatura  = new Asignatura({
        nombre: body.nombre
    })
    await nuevaAsignatura.save()
    return nuevaAsignatura
}

async function borrar(id){
    const resultado = await Asignatura.findByIdAndDelete(id)
    return resultado
}

module.exports = {
    obtenerTodos,
    crear,
    borrar
}