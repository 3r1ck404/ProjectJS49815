let usuario;
let categoria;
let respuesta = 'naranja';
let respuestaUsuario;
let intento = 0;
let reiniciar = undefined;
let textoValido;

do {
    usuario = prompt('Ingrese su nombre: ');
    textoValido = validarTexto(usuario);
} while (textoValido === false)

do {
    categoria = prompt('Hola ' + usuario + '!!!\n' + 'Ingresa la categoria a adivinar(color o fruta): ').toUpperCase();
    if (categoria === 'FRUTA' || categoria === 'COLOR') {
        break;
    }
} while (categoria !== 'FRUTA' || categoria !== 'COLOR')

jugar(categoria);

function jugar(categoria) {
    alert('La categoria es ' + categoria + '. Que comience el juego!!! \nSolo tendrás 3 intentos.');
    do {
        if (reiniciar === false) {
            break;
        } else {
            respuestaUsuario = prompt('Ingrese su respuesta de acuerdo a la siguiente pista:\n _ _ R _ _ _ _');
            intento = intento + 1;
            if (respuestaUsuario === respuesta) {
                alert('Lo has conseguido. ' + intento + ' intento(s).\nFelicidades!!!');
                break;
            } else if (intento === 2) {
                alert('Le queda sólo un intento. Comodín.\n N _ R _ _ _ _')
            } else if (intento === 3 && respuestaUsuario !== respuesta) {
                alert('Ha perdido.');
                reiniciar = confirm('¿Desea jugar de nuevo?: ');
                if (reiniciar === true) {
                    intento = 0;
                    jugar(categoria);
                }
            } else if (reiniciar === false) {
                break;
            }
        }
    } while ((respuestaUsuario !== respuesta))
}

function validarTexto(usuario) {
    for (let i = 0; i < usuario.length; i++) {
        if (!isNaN(usuario[i])) {
            alert(usuario[i] + ' es un número. Solo puede ingresar letras.');
            return false;
        }
    }
}