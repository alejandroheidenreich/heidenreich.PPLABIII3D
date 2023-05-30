export function SuperHeroe(id, nombre, alias, editorial, fuerza, arma,) {
    this.id = validarID(id);
    this.nombre = validarString(nombre, "Nombre");
    this.alias = validarString(alias, "Alias");
    this.editorial = validarString(editorial, "Editorial");
    this.fuerza = validarCantidad(fuerza);
    this.arma = validarArma(arma);
}

function validarID(id) {
    if (typeof (id) == 'number' && id > 0) {
        return id;
    } else {
        throw new Error('Error: Invalid ID');
    }
}


function validarCantidad(number) {
    if (typeof (number) == 'number' && number >= 0) {
        return number;
    } else {
        throw new Error('Error: Invalid de cantidad');
    }
}

function validarString(string, clave) {
    if (typeof (string) == 'string' && string.length > 0) {
        return string;
    } else {
        throw new Error('Error: Invalid ' + clave);
    }
}
function validarArma(arma) {
    if (typeof (arma) == 'string' && (arma == 'Armadura' || arma == 'Espada' || arma == 'Martillo' || arma == 'Escudo' || arma == 'ARma de Fuego' || arma == 'Flechas')) {
        return arma;
    } else {
        throw new Error('Error: Invalid Transaccion');
    }
}

export function ordenarListaPorCriterio(lista, criterio, orden) {
    let auxiliar;
    for (let i = 0; i < lista.length; i++) {
        for (let j = i + 1; j < lista.length; j++) {
            if ((!orden && lista[i][criterio] > lista[j][criterio]) || (orden && lista[i][criterio] < lista[j][criterio])) {
                auxiliar = lista[i];
                lista[i] = lista[j];
                lista[j] = auxiliar;
            }
        }
    }
}

export function obtenerUltimoID(lista) {
    let ultimoID = 0;

    lista.forEach((anuncio) => {
        if (ultimoID == 0 || parseInt(anuncio['id']) > ultimoID) {
            ultimoID = parseInt(anuncio['id']);
        }
    });

    return ultimoID + 1;
}