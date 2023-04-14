const mongoose   = require('mongoose')

const alumnoSchema = new mongoose.Schema({
    nombre: {
        required: true,
        type: String,
    },
    dni:{
        required: true,
        type: String,
    },
    edad:{
        required: true,
        type: Number,
    },
    apellidos:{
        type: String,
    },
    direccion:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Direccion"
    }
})

module.exports = mongoose.model("Alumno", alumnoSchema)
