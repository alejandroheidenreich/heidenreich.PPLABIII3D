export function Personaje(id, nombre, fuerza) {
    this.id = validarID(id);
    this.nombre = validarString(nombre, "Nombre");
    this.fuerza = validarCantidad(fuerza);
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
