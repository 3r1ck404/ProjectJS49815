// Aqui se manejan los diferentes eventos que sucedan en el juego
let juego;
let usuarios_verificados = [];
// Inicialmente se muestra solo el bloque de nombre
mostrar(nombre, true)
mostrar(seleccion_categoria, false)
mostrar(input_respuestas, false)
//localStorage.clear()

// Se elimina todo evento por defecto al formulario
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
})

document.querySelector('form').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
})
// Eventos pertinentes a los diferentes botones de los bloques
// En cada bloque solo tengo un boton, entonces uso querySelector sobre cada bloque buscando el boton

// Boton para obtener el nombre
nombre.querySelector('button').addEventListener('click', () => {
    // Se captura el valor del input dentro del bloque de nombre
    let nombre_usuario = nombre.querySelector('input').value;
    // Se verifica que no este vacio
    if (!validarTexto(nombre_usuario)) {
        mostrar_toast('Nombre inválido. Ingrese solo letras.', 'error-message');
    } else {
        // Se instancia el objeto Juego pasandole como parametro el nombre del usuario
        juego = new Juego(nombre_usuario, 0);

        if (!localStorage.getItem('usuarios_verificados')) {
            let usuario = {
                nombre_usuario: nombre_usuario.toUpperCase(),
                score: 0
            }
            usuarios_verificados.push(usuario);
            // Se agrega al localStorage
            localStorage.setItem('usuarios_verificados', JSON.stringify(usuarios_verificados));
        } else {
            usuarios_verificados = JSON.parse(localStorage.getItem('usuarios_verificados'));
            let usuario = usuarios_verificados.find((elm) => elm.nombre_usuario === nombre_usuario.toUpperCase());
            // Se verifica que no este vacio
            if (noEsVacio(usuario)) {
                juego.score = usuario.score;
                mostrar_toast('Usuario encontrado', 'warning-message');
            } else {
                let usuario = {
                    nombre_usuario: nombre_usuario.toUpperCase(),
                    score: 0
                }
                usuarios_verificados.push(usuario);
                localStorage.setItem('usuarios_verificados', JSON.stringify(usuarios_verificados));
                mostrar_toast('Usuario nuevo', 'warning-message');
            }
        }

        titulo.innerText = 'Bienvenid@ ' + ((String)(juego.jugador)).toLocaleUpperCase();
        document.querySelector('p.score').innerText = 'score 🔖 : ' + juego.score;
        // Una vez se ingresa el nombre, se oculta el bloque de nombre y muestro el de seleccion de categoria
        mostrar(nombre, false);
        mostrar(seleccion_categoria, true);
    }
})

// Boton para seleccionar una categoria
seleccion_categoria.querySelector('button').addEventListener('click', () => {
    // Se toma los inputs que hay dentro del bloque con la class inputs-categoria
    // Dentro se toma todos los input y verifica cual ha sido seleccionado
    let selec_categoria = document.querySelector('input[name="categorias"]:checked');

    if (!selec_categoria) {
        mostrar_toast('Seleccione una categoria', 'error-message');
    } else {
        // Cuando se tiene la categoria seleccionada entonces accedo a lista_palabras
        // y obtengo la lista de palabras,        
        let categoria = lista_palabras.find(palabras => palabras.codigoNombre === selec_categoria.value)
        // guardo en las propiedades categoria y palabras de juego
        // el nombre de la categoria y la lista de palabras correspondiente de lista_palabras        
        juego.categoria = categoria.codigoNombre;
        juego.palabras = categoria.lista_palabras;
        // Llamo al metodo .obtener_palabra() para obtener 
        // la palabra que vamos a mostrar y a la funcion actualizar_palabra()
        // le pasamos como parametro la palabra con los _
        let [palabra_actual, palabra_juego] = juego.obtener_palabra(juego.palabras);
        juego.palabra_actual = palabra_actual;
        juego.palabra_juego = palabra_juego;

        actualizar_palabra(palabra_juego);
        // Finalmente se oculta el bloque de seleccion categoria y mostramos la de input_letras
        mostrar(seleccion_categoria, false);
        mostrar(input_respuestas, true);
    }
})

// Boton para intentar con una letra
input_respuestas.querySelector('button').addEventListener('click', () => {
    // Aqui se toma el value del input que contiene la letra
    let input_letra = document.getElementById('input-letras').value;
    let input_palabra = document.getElementById('input-palabra').value;

    if (input_letra && input_palabra || !noEsVacio(input_letra) && !noEsVacio(input_palabra)) {
        mostrar_toast('Ingrese solo una opción: Letra o Palabra.', 'error-message');
    } else {
        // Se verifica antes que nada que no sea vacio y sea una letra
        // Una vez tengo el value  se llama a los metodos del objeto juego para
        // 1. Saber si la letra o palabra esta en la respuesta o no
        // 2. Mostrar si se equivoco o no (y cantidad de intentos)
        // 3. actualizar_palabra en caso de haber acertado          
        if (input_letra) {
            if (!validarTexto(input_letra)) {
                mostrar_toast('Ingrese solo letra.', 'error-message');
            } else {
                juego.verificar_letra(input_letra);
            }
        } else {
            juego.verificar_palabra(input_palabra.toLocaleUpperCase());
        }
    }
})
