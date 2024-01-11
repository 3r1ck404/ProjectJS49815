let usuario;
let intento = 0;
let textoValido;
let respuestaAccion;
let categorias;

class Categoria {
    constructor(nombre, codigoNombre, descripcion, lista) {
        this.nombre = nombre;
        this.codigoNombre = codigoNombre;
        this.descripcion = descripcion;
        this.lista = lista;
    }
}

let listaCategorias = [
    new Categoria('Color', 'COLOR', 'Categoria de colores', ['AMARILLO', 'NARANJA', 'BLANCO']),
    new Categoria('Fruta', 'FRUTA', 'Categoria de frutas', ['CEREZA', 'MANZANA', 'PLATANO']),
    new Categoria('Animal', 'ANIMAL', 'Categoria de animales', ['CABALLO', 'JIRAFA', 'ELEFANTE'])
];

//console.log(localStorage.getItem('categorias'));
if (!localStorage.getItem('categorias')) {
    localStorage.setItem('categorias', JSON.stringify(listaCategorias));
}

let formRegistrar = clonarPlantilla('#form-registrar');
let formMenu = clonarPlantilla('#form-menu');
let formCategoria = clonarPlantilla('#form-categoria');
let formJugar = clonarPlantilla('#form-jugar');
let formAgregar = clonarPlantilla('#form-agregar');

formRegistrar.querySelector('h2').innerText = 'Bienvenido';
formRegistrar.querySelector('p').innerText = "Escriba su nombre.";
formRegistrar.style.display = 'block';
formRegistrar.querySelector('button').addEventListener('click', () => {
    textoValido = validarTexto(formRegistrar.querySelector('input').value);

    if (textoValido) {
        formRegistrar.style.display = 'none';
        usuario = formRegistrar.querySelector('input').value;
        menu(usuario);
    } else {
        formRegistrar.querySelector('p.mensaje').innerText = 'Nombre inválido. Ingrese sólo letras.';
    }
});

function menu(usuario) {
    formMenu.querySelector('h2').innerText = 'Hola ' + usuario.toUpperCase() + ' !!!';
    formMenu.querySelector('p').innerText = 'Ingresa el "número" de acción a realizar: \n\n1. JUGAR\n2. AGREGAR ELEMENTO A CATEGORIA\n';
    formMenu.style.display = 'block';
    formMenu.querySelector('button').addEventListener('click', menuEvento);
}

function menuEvento() {
    respuestaAccion = formMenu.querySelector('input').value;

    if (respuestaAccion !== '1' && respuestaAccion !== '2') {
        formMenu.querySelector('p.mensaje').innerText = 'Elija un número válido';
    } else {
        formMenu.style.display = 'none';
        formMenu.querySelector('input').value = '';
        seleccionarCategoria(respuestaAccion);
    }
}

function seleccionarCategoria(respuestaAccion) {
    categorias = localStorage.getItem('categorias');
    categorias = JSON.parse(categorias);

    formCategoria.style.display = 'block';
    formCategoria.querySelector('input').value = '';
    formCategoria.querySelector('h2').innerText = '';
    formCategoria.querySelector('p.mensaje').innerText = '';
    let categoriaText = '';

    for (let elemento of categorias) {
        categoriaText += '<li>' + elemento.nombre.toUpperCase() + '</li>';
    }

    formCategoria.querySelector('p').innerHTML = 'Escriba la categoria.\n\n' + '<br></br>' + categoriaText;

    formCategoria.querySelector('button').addEventListener('click', function () {
        categoriaEvento(respuestaAccion);
    });
}

function categoriaEvento(proceso) {
    let validarCategoria;
    let respuestaCategoria = formCategoria.querySelector('input').value;
    validarCategoria = validarTexto(formCategoria.querySelector('input').value);

    if (validarCategoria) {
        validarCategoria = categorias.find((elm) => elm.codigoNombre === respuestaCategoria.toUpperCase());

        if (!validarCategoria) {
            formCategoria.querySelector('p.mensaje').innerText = 'Categoria inválida';
        } else {
            if (proceso === '1') {
                formCategoria.style.display = 'none';
                let categoriaAJugar = validarCategoria;
                let indiceAleatorio = obtenerIndiceAleatorio(categoriaAJugar.lista.length, null);
                const palabraAJugar = categoriaAJugar.lista[indiceAleatorio];
                //console.log(palabraAJugar);
                jugar(categoriaAJugar.codigoNombre, palabraAJugar);
            } else {
                formCategoria.style.display = 'none';
                let categoriaAModificar = validarCategoria;
                agregar(categoriaAModificar);
            }
        }
    } else {
        formCategoria.querySelector('p.mensaje').innerText = 'Categoria inválida';
    }
}

function jugar(categoria, palabraAJugar) {
    formCategoria.style.display = 'none';

    let pista = obtenerPalabraAJugar(palabraAJugar, '');
    formJugar.querySelector('h2').innerText = 'A jugar!!!';
    formJugar.querySelector('p').innerText = 'La categoria es ' + categoria + '.' + ' Solo tendrás 3 intentos.\n\n' + 'Ingrese su respuesta de acuerdo a la siguiente pista:\n\n' + pista;
    formJugar.style.display = 'block';
    formJugar.querySelector('button').addEventListener('click', function () {
        jugarEvento(palabraAJugar, pista);
    });
}

function jugarEvento(palabraAJugar, pista) {
    let respuestaUsuario = formJugar.querySelector('input').value.toUpperCase();
    intento = intento + 1;

    if (respuestaUsuario === palabraAJugar) {
        formJugar.querySelector('p').innerText = '';
        formJugar.querySelector('p.mensaje').innerText = 'Lo has conseguido. ' + intento + ' intento(s). Felicidades!!!';
        formJugar.querySelector('button').style.display = 'none';
    } else if (intento === 2) {
        let comodin = obtenerPalabraAJugar(palabraAJugar, pista);
        //console.log(comodin);
        formJugar.querySelector('p.mensaje').innerText = '';
        formJugar.querySelector('p').innerText = 'Le queda sólo un intento. Comodín. \n\n' + comodin;
        pista = comodin;
    } else if (intento === 3 && respuestaUsuario !== palabraAJugar) {
        formJugar.querySelector('p.mensaje').innerText = 'Has perdido.'
        formJugar.querySelector('button').style.display = 'none';
    } else {
        formJugar.querySelector('input').value = '';
        formJugar.querySelector('p.mensaje').innerText = 'Inténtelo de nuevo.'
    }
}

function agregar(categoriaAModificar) {
    formAgregar.querySelector('h2').innerText = 'Mantenimiento';
    formAgregar.querySelector('p').innerText = 'Escriba el valor a agregar a la categoria ' + categoriaAModificar.codigoNombre + ' .';
    formAgregar.style.display = 'block';

    formAgregar.querySelector('button').addEventListener('click', function () {
        agregarEvento(categoriaAModificar);
    });
}

function agregarEvento(categoriaAModificar) {
    let validarElemento;
    let respuestaElemento = formAgregar.querySelector('input').value;
    validarElemento = validarTexto(respuestaElemento);

    if (validarElemento) {
        validarElemento = categoriaAModificar.lista.find((elm) => elm === respuestaElemento.toUpperCase());
        if (!validarElemento) {
            categoriaAModificar.lista.push(respuestaElemento.toUpperCase());
            for (let i = 0; i < categorias.length; i++) {
                if (categorias[i].codigoNombre === categoriaAModificar.codigoNombre) {
                    categorias[i] = categoriaAModificar;  // Actualiza la categoría en el array general
                    break;
                }
            }
            localStorage.setItem('categorias', JSON.stringify(categorias));
            formAgregar.querySelector('p.mensaje').innerText = 'Se ha cargado el elemento.';
            formAgregar.querySelector('button').style.display = 'none';
        } else {
            formAgregar.querySelector('p.mensaje').innerText = 'Ya existe el elemento.';
        }
    } else {
        formAgregar.querySelector('p.mensaje').innerText = 'Ingrese solo letras.';
    }
}

function listarCategoria(categorias) {
    formCategoria.style.display = 'block';
    formCategoria.querySelector('input').value = '';
    formCategoria.querySelector('h2').innerText = '';
    formCategoria.querySelector('p.mensaje').innerText = '';
    let categoriaText = '';

    for (let elemento of categorias) {
        categoriaText += '<li>' + elemento.nombre.toUpperCase() + '</li>';
    }
    formCategoria.querySelector('p').innerHTML = 'Escriba la categoria.\n\n' + '<br></br>' + categoriaText;
}

function clonarPlantilla(selectorContenedor) {
    let contenedor = document.querySelector(selectorContenedor);
    let clon = document.querySelector('.form-template').content.cloneNode(true);
    clon.querySelector('p.mensaje').innerText = '';
    contenedor.append(clon);
    contenedor.style.display = 'none';
    return contenedor;
}

function obtenerPalabraAJugar(palabraAJugar, pista) {
    let palabraTexto = '';
    const listaDeLetras = palabraAJugar.split('');

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
    let boolean;
    if (valorTexto) {
        for (let i = 0; i < texto.length; i++) {
            if (!isNaN(texto[i])) {
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