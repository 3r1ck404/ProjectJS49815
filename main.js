let usuario;
let respuestaUsuario;
let intento = 0;
let reiniciar = undefined;
let textoValido;
let respuestaAccion;
let categorias;

class Categoria {
    static listaCategorias = [];
    constructor(nombre, codigoNombre, descripcion, lista) {
        this.nombre = nombre;
        this.codigoNombre = codigoNombre;
        this.descripcion = descripcion;
        this.lista = lista;

        Categoria.listaCategorias.push(this);
    }

    agregarElemento(elemento, lista) {
        lista.push(elemento);
    }

    static obtenerListaCategorias() {
        return Categoria.listaCategorias;
    }
}

let categoria1 = new Categoria('Color', 'COLOR', 'Categoria de colores', ['AMARILLO', 'NARANJA', 'BLANCO']);
let categoria2 = new Categoria('Fruta', 'FRUTA', 'Categoria de frutas', ['CEREZA', 'MANZANA', 'PLATANO']);
let categoria3 = new Categoria('Animal', 'ANIMAL', 'Categoria de animales', ['CABALLO', 'JIRAFA', 'ELEFANTE']);

do {
    usuario = prompt('Ingrese su nombre: ');
    textoValido = validarTexto(usuario);
} while (textoValido === false)

do {
    respuestaAccion = parseInt(prompt('Hola ' + usuario.toUpperCase() + ' !!!\n' + 'Ingresa el "número" de acción a realizar: \n1. JUGAR\n2. AGREGAR ELEMENTO A CATEGORIA\n'));
} while (respuestaAccion !== 1 && respuestaAccion !== 2)

switch (respuestaAccion) {
    case 1:
        categorias = Categoria.obtenerListaCategorias();
        let categoriaAJugar = obtenerCategoria(categorias);

        let indiceAleatorio = obtenerIndiceAleatorio(categoriaAJugar.lista.length, null);
        const palabraAJugar = categoriaAJugar.lista[indiceAleatorio];
        jugar(categoriaAJugar.codigoNombre, palabraAJugar);
        break;
    case 2:
        categorias = Categoria.obtenerListaCategorias();
        let categoriaModificar = obtenerCategoria(categorias);
        let respuestaElemento = obtenerElemento(categoriaModificar);
        let jugarNuevoElemento = confirm('¿Desea jugar con el nuevo valor agregado?');

        if (jugarNuevoElemento === true) {
            let nuevoElemento = categoriaModificar.lista.filter((elm) => elm === respuestaElemento.toUpperCase());
            jugar(categoriaModificar.codigoNombre, nuevoElemento[0]);
        } else {
            break;
        }
        //console.log(categoriaModificar);
        break;
    default:
        break;
}

function obtenerElemento(categoriaModificar) {
    let respuestaElemento;
    let validarElemento;
    do {
        respuestaElemento = prompt('Escriba el valor a agregar a la categoria ' + categoriaModificar.codigoNombre + ' .');
        validarElemento = validarTexto(respuestaElemento);
        if (validarElemento) {
            categoriaModificar.agregarElemento(respuestaElemento.toUpperCase(), categoriaModificar.lista);
        }
    } while (!validarElemento);
    return respuestaElemento;
}

function obtenerCategoria(categorias) {
    let categoriaText = '';
    let validarCategoria;
    for (let elemento of categorias) {
        categoriaText += '- ' + elemento.nombre.toUpperCase() + '\n';
    }

    do {
        let respuestaCategoria = prompt('Escriba la categoria a jugar.\n' + categoriaText);
        validarCategoria = validarTexto(respuestaCategoria);
        if (validarCategoria) {
            validarCategoria = categorias.find((elm) => elm.codigoNombre === respuestaCategoria.toUpperCase());
        }
    } while (!validarCategoria);
    return validarCategoria;
}

function jugar(categoria, palabraAJugar) {
    alert('La categoria es ' + categoria + '. Que comience el juego!!! \nSolo tendrás 3 intentos.');
    let pista = obtenerPalabraAJugar(palabraAJugar, '');
    do {
        if (reiniciar === false) {
            break;
        } else {
            //console.log('pista-> ' + pista);
            respuestaUsuario = prompt('Ingrese su respuesta de acuerdo a la siguiente pista:\n' + pista).toUpperCase();
            intento = intento + 1;
            if (respuestaUsuario === palabraAJugar) {
                alert('Lo has conseguido. ' + intento + ' intento(s).\nFelicidades!!!');
                break;
            } else if (intento === 2) {
                let comodin = obtenerPalabraAJugar(palabraAJugar, pista);
                alert('Le queda sólo un intento. Comodín.\n' + comodin);
                pista = comodin;
                //console.log('comodin-> ' + comodin);
            } else if (intento === 3 && respuestaUsuario !== palabraAJugar) {
                alert('Ha perdido.');
                reiniciar = confirm('¿Desea jugar de nuevo?: ');
                if (reiniciar === true) {
                    intento = 0;
                    jugar(categoria, palabraAJugar);
                }
            } else if (reiniciar === false) {
                break;
            }
        }
    } while ((respuestaUsuario !== palabraAJugar))
}

function obtenerPalabraAJugar(palabraAJugar, pista) {
    let palabraTexto = '';
    const listaDeLetras = palabraAJugar.split('');
    //console.log(listaDeLetras);

    if (pista) {
        let contador = 0;
        let listaDePista = pista.split(' ').filter(elm => elm !== '');
        for (let i = 0; i < listaDeLetras.length; i++) {
            if (listaDePista[i] === '_' && contador !== 2) {
                palabraTexto += ' ' + listaDeLetras[i] + ' ';
                contador += 1;
            } else if (listaDePista[i]) {
                palabraTexto += ' ' + listaDePista[i] + ' ';
            } else {
                palabraTexto += ' ' + ' _ ' + ' ';
            }
        }
        return palabraTexto;
    } else {
        const indice1 = obtenerIndiceAleatorio(listaDeLetras.length, null);  // null porque no hay índice anterior aún
        const indice2 = obtenerIndiceAleatorio(listaDeLetras.length, indice1);
        for (let i = 0; i < listaDeLetras.length; i++) {
            if (i === indice1 || i === indice2) {
                palabraTexto += ' ' + listaDeLetras[i] + ' ';
            } else {
                palabraTexto += ' _ ';
            }
        }
        return palabraTexto;
    }
}

function obtenerIndiceAleatorio(longitud, indiceAnterior) {
    let indiceAleatorio;
    do {
        indiceAleatorio = Math.floor(Math.random() * longitud);
    } while (indiceAleatorio === indiceAnterior);

    return indiceAleatorio;
}

function validarTexto(texto) {
    let valorTexto = noEsVacio(texto);
    if (valorTexto) {
        for (let i = 0; i < texto.length; i++) {
            if (!isNaN(texto[i])) {
                alert(texto[i] + ' es un número. Solo puede ingresar letras.');
                return false;
            } else {
                return true;
            }
        }
    } else {
        return false;
    }
}

function noEsVacio(obj) {
    const sinValor =
        obj === null || obj === undefined || obj === "" ? false : true;
    return sinValor;
}