// Archivo para llevar lo visual 

// Se toma los bloques que tengo que mostrar / sacar
let nombre = document.querySelector('.nombre')
let input_respuestas = document.querySelector('.input-respuestas')
let seleccion_categoria = document.querySelector('.seleccion-categoria')
let titulo = document.querySelector('h1');
// Se crea variable para tomar los valores del archivo .son
let lista_palabras = [];

// Se arma una funcion para mostrar o quitar los bloques
function mostrar(bloque,bool) {
    // Se toma el bloque del DOM con el que quiero trabajar
    // Se toma un booleano para mostrar u ocultar (true = mostrar, false = ocultar)

    if (bool) {
        bloque.classList.remove('ocultar')
    } else {
        bloque.classList.add('ocultar')
    }

    // Si vamos a mostrar el array de categorias
    // se llama al archivo data.json para tener 
    // las categorias actualizadas
    if (bloque.classList.value == 'seleccion-categoria') {
        fetch ('data/data.json')
            // metodo.json() -> devolvera Los datos
            .then (response => response.json() )
            // Se obtiene los datos
            .then (data => {
                lista_palabras = data;
                cargar_categorias(data);
            })
    }
}

// Esta funcion se encarga de
// 1. Vaciar el div con los inputs tipo radio
// 2. Tomar el template
// 3. Crear copias y meter los nuevos inputs actualizados
function cargar_categorias(arr_categorias) {
    seleccion_categoria.querySelector('.inputs-categoria').innerHTML = '';
    arr_categorias.forEach(elm => {
        let clon = seleccion_categoria.querySelector('template').content.cloneNode(true)
        
        // Se toma la etiqueta input
        let inp = clon.querySelector('input');
        inp.id = elm.nombre;
        inp.value = elm.codigoNombre;
        inp.name = 'categorias';

        // Se toma la etiqueta label
        let lab = clon.querySelector('label');
        lab.innerText = elm.codigoNombre;
        lab.attributes.for.value = elm.nombre;
        seleccion_categoria.querySelector('.inputs-categoria').append(clon);
    });    
}

// Funcion que sirve para actualizar la palabra al usuario de forma oculta
function actualizar_palabra(palabra) {
    input_respuestas.querySelector('p.palabra').innerText = palabra;
}

// Funcion para la libreria toastify
function mostrar_toast(texto,clase) {
    Toastify({
        text: texto,
        className: clase, // Clase CSS adicional
        gravity:"top",
        duration: 4000,
        close: false,
        position: "right",
        stopOnFocus: true,
        oldestFirst: false
    }).showToast();
}

// Funcion para la libreria sweetAlert
function mostrar_sweetAlert(titulo, texto) {
    Swal.fire({
        title: titulo,
        text: texto,
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
}