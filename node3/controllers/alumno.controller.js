const Alumno = require('../models/alumno.model')

async function obtenerTodos(){
    // el populate sirve para que traiga el objeto dirección en lugar de el ID
    const alumnos = await Alumno.find().populate('direccion')
    return alumnos
}

async function obtenerPorId(id){
    const alumno = await Alumno.findOne({_id: id})
    return alumno
}


async function obtenerPorDNI(dniBuscar){
    const alumno = await Alumno.findOne({dni: dniBuscar})
    return alumno
}

async function crear(body){
    const nuevoAlumno = new Alumno({
        nombre: body.nombre,
        dni: body.dni,
        edad: body.edad,
        direccion: body.direccion,
    })
    await nuevoAlumno.save()
    return nuevoAlumno
}

async function modificar(id,body){
    await Alumno.findByIdAndUpdate(id,body)
}


module.exports = {
    obtenerTodos,
    obtenerPorId,
    obtenerPorDNI,
    crear,
    modificar,
}
