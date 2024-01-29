function validarTexto(texto) {
    let valorTexto = noEsVacio(texto);
    let boolean;
    if (valorTexto) {
        for (let i = 0; i < texto.length; i++) {
            if (!isNaN(texto[i]) || (!/^[a-zA-Z\s]*$/.test(texto[i]))) {
                boolean = false;
                break;
            } else {
                boolean = true;
            }
        }
        return boolean;
    } else {
        boolean = false;
        return boolean;
    }
}

function noEsVacio(obj) {
    const sinValor =
        obj === null || obj === undefined || obj === "" ? false : true;
    return sinValor;
}

function obtenerIndiceAleatorio(longitud) {
    let indiceAleatorio;
    indiceAleatorio = Math.floor(Math.random() * longitud);
    return indiceAleatorio;
}