export const sumar = (a,b)=>{
    return a+b
}

export const multiplicar = (a,b)=>{
    return a*b
}

export const saludar = (nombre) => {
    console.log(`hola ${nombre}`)
}

export const sumarArray = (array) => {
    let acumulador = 0
    for(const num of array){
        acumulador += Number(num)
    }
    return acumulador
}

export const sumarArrayReduce = (array)=> {
    return array.reduce((acumulador,actual)=> acumulador + Number(actual), 0)
}
