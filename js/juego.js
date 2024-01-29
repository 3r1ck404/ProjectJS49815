// Archivo para llevar las acciones que ocurren en el juego
class Juego {
    constructor(nombre, score) {
        // Nombre del jugador
        this.jugador = nombre.toUpperCase();
        // Nombre de la categoria de la palabra actual
        this.categoria;
        // Lista de palabras de la categoria
        this.palabras;
        // Llevamos el control de la palabra actual
        this.palabra_actual;
        // String que mostramos al usuario osea el string con los _
        this.palabra_juego;
        // Numero de intentos
        this.intentos = 3;
        // Score
        this.score = score;
    }
    // Funcion para setear la palabra_actual que se usa en el momento
    // Ademas tambien esconder las letras con _
    // y guardarlo en palabra_juego
    obtener_palabra(lista) {
        let indice = obtenerIndiceAleatorio(lista.length);
        let palabra_actual = lista[indice];
        let palabra_juego = palabra_actual.split('');

        for (let i = 1; i < palabra_juego.length - 1; i++) {
            palabra_juego[i] = '_';
        }
        palabra_juego = palabra_juego.join('');

        return [palabra_actual, palabra_juego];
    }

    // Funcion para verificar que la letra esta en la palabra
    // Si esta en la palabra llamar al metodo rellenar_palabra
    verificar_letra(letra) {
        let indices = [];

        for (let i = 1; i < (this.palabra_actual.split('')).length - 1; i++) {
            if (this.palabra_actual[i] === letra.toLocaleUpperCase()) {
                indices.push(i);
            }
        }

        if (indices.length === 0) {
            this.intentos = this.intentos - 1
            if (this.intentos === 0) {
                mostrar_sweetAlert('Fue tu último intento 😵😵😵 ‼️', this.palabra_actual + ' era la respuesta. Has perdido.');
                document.getElementById('input-letras').value = '';
                mostrar(input_respuestas, false);
                mostrar(seleccion_categoria, true);
                this.intentos = 3;
            } else {
                mostrar_toast(`Le queda ${this.intentos} intento(s).`, 'error-message');
                mostrar_toast(`¡Oh no! La letra "${letra.toLocaleUpperCase()}" no le ayuda a completar.`, 'error-message');
            }
        } else {
            this.rellenar_palabra(indices, letra);
        }
    }

    // Funcion para rellenar la palabra con la letra seleccionada
    // Se usa la propiedad palabra_juego
    rellenar_palabra(indices, letra) {
        let palabra_juego = this.palabra_juego.split('');

        for (let i = 1; i < palabra_juego.length - 1; i++) {
            for (let j = 0; j < indices.length; j++) {
                if (i === indices[j]) {
                    palabra_juego[i] = letra.toLocaleUpperCase();
                }
            }
        }

        this.palabra_juego = palabra_juego.join('');
        actualizar_palabra(this.palabra_juego);
        input_respuestas.querySelector('input').value = '';

    }

    // Funcion para verificar que la palabra sea la respuesta
    verificar_palabra(palabra) {
        if (palabra.toLocaleUpperCase() === this.palabra_actual) {
            mostrar_sweetAlert('Felicitaciones 🎉🎉🎉 ‼️‼️', this.palabra_actual + ' era la respuesta. Has ganado.');
            document.getElementById('input-palabra').value = '';
            nombre.querySelector('input').value = '';
            mostrar(input_respuestas, false);
            mostrar(seleccion_categoria, true);
            this.intentos = 3;
            this.score = this.score + 1;
            document.querySelector('p.score').innerText = 'score 🔖 : ' + this.score;
            this.actualizar_score();
        } else {
            this.intentos = this.intentos - 1
            if (this.intentos === 0) {
                mostrar_sweetAlert('Fue tu último intento 😵😵😵 ‼️', this.palabra_actual + ' era la respuesta. Has perdido.');
                document.getElementById('input-palabra').value = '';
                mostrar(input_respuestas, false);
                mostrar(seleccion_categoria, true);
                this.intentos = 3;
            } else {
                mostrar_toast(`Le queda ${this.intentos} intento(s).`, 'error-message');
                mostrar_toast(`¡Oh no! La palabra "${palabra.toLocaleUpperCase()}" no es la respuesta.`, 'error-message');
            }
        }
    }

    actualizar_score() {
        let usuarios_verificados = [];
        usuarios_verificados = JSON.parse(localStorage.getItem('usuarios_verificados'));
        let indiceUsuario = usuarios_verificados.findIndex((elm) => elm.nombre_usuario === this.jugador);
        usuarios_verificados[indiceUsuario].score = this.score;
        localStorage.setItem('usuarios_verificados', JSON.stringify(usuarios_verificados));
    }
}