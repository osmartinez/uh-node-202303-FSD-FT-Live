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
    }
})

module.exports = mongoose.model("Alumno", alumnoSchema)
