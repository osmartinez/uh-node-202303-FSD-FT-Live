

function check1 (req,res,next){
    console.log("ESTA PASANDO POR EL CHECK1")
    next()
}

function check2(req,res,next){
    console.log("ESTA PASANDO POR EL CHECK2")
    res.status(403)
    res.json("NO TIENES PERMISOS PARA REALIZAR ESTA ACCIÓN")
}

function esDniValido(req,res,next){
    if( req.body.dni.length !== 9){
        res.status(400)
        res.json({msg: "el dni no está bien formado"})
    }
    else{
        next()
    }
}

function esModificacionPermitida(req,res,next){
    if(req.body.esAdmin)
    {
        res.status(403)
        res.json({msg: "no tienes permisos para realizar esta acción"})
    }
    else{
        next()
    }
}

module.exports = {
    check1,
    check2,
    esDniValido,
    esModificacionPermitida
}