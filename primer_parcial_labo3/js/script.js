import { actualizarTabla } from './tabla.js';
import { SuperHeroe, ordenarListaPorCriterio, obtenerUltimoID } from './superheroe_con_herencia.js';
import { crearFormulario } from './formulario.js';


// import { armas } from './armas.js';
// actualizarStorage('armas', armas);

const armas = JSON.parse(localStorage.getItem('armas')) || [];
const superheroes = JSON.parse(localStorage.getItem('superheroes')) || [];
const $seccionTabla = document.getElementById('tabla');
const $seccionFormulario = document.getElementById('formulario');
const colorHeader = "darkorange";
const identificador = "id";
const titulo = "Lista de Super Heroes";
const formatoSuperHeroe = { id: '', nombre: 'asd', alias: 'asd', editorial: 'asd', fuerza: '100', arma: 'Armadura' }
let ordenActivo;
actualizarTabla($seccionTabla, superheroes, colorHeader, identificador, titulo);
$seccionFormulario.appendChild(crearFormulario("Informacion del SuperHeroe", formatoSuperHeroe, identificador, "arma", armas, "editorial", ["Marvel", "DC"]));
const $formulario = document.querySelector('form');
resetFormulario($formulario);



window.addEventListener('click', (e) => {
    if (e.target.matches('td')) {
        handlerSelectedTD(e);
    }
    else if (e.target.matches('th')) {
        handlerSelectedTH(e);
    }
    else if (e.target.matches("input[type='submit']")) {
        handlerSubmit();
    }
    else if (e.target.matches("input[type='button']")) {
        handlerButton();
    }
    else if (e.target.matches("input[type='reset']")) {
        console.log("Cancelando");
        resetFormulario($formulario);
    }
});

function handlerSelectedTD(e) {
    const selector = e.target.parentElement.dataset.id;
    console.log(selector);
    const selectedSuperHeroe = superheroes.find((SuperHeroe) => SuperHeroe.id == selector);
    if (!document.getElementById('boton-cancelar')) {
        const $botonera = document.getElementById('botonera');
        const botonCancelar = document.createElement('input');
        botonCancelar.type = 'reset';
        botonCancelar.value = 'Cancelar';
        botonCancelar.id = 'boton-cancelar';
        botonCancelar.classList.add('cancelar');
        $botonera.appendChild(botonCancelar);
    }
    cargarFormulario($formulario, selectedSuperHeroe);
}

function handlerSelectedTH(e) {
    const selector = e.target.textContent;
    console.log(selector);

    const id = obtenerUltimoID(superheroes);
    console.log(id);
    ordenarListaPorCriterio(superheroes, selector, selector == ordenActivo);
    if (selector == ordenActivo) {
        ordenActivo = null;
    } else {
        ordenActivo = selector;
    }
    actualizarTabla($seccionTabla, superheroes, colorHeader, identificador, titulo);
}
function handlerButton() {
    console.log("Eliminando...");
    if ($formulario.txtId.value != "") {
        if (confirm("¿Desea eliminar este SuperHeroe?")) {
            handlerDelete(parseInt($formulario.txtId));
            resetFormulario($formulario);
        }
    } else {
        alert("Debe seleccionar para eliminar");
    }
}

function handlerSubmit() {
    console.log("Enviando");

    const { txtId, txtNombre, txtAlias, radioEditorial, txtFuerza, selectArma } = $formulario;

    try {
        if (txtId.value == '') {
            let id = 1;
            if (superheroes.length > 0) {
                id = obtenerUltimoID(superheroes);
            }
            const newSuper = new SuperHeroe(id, txtNombre.value, txtAlias.value, radioEditorial.value, parseInt(txtFuerza.value), selectArma.value);
            if (confirm("¿Desea cargar el SuperHeroe?")) handlerCreate(newSuper);
        } else {
            const updatedSuper = new SuperHeroe(parseInt(txtId.value), txtNombre.value, txtAlias.value, radioEditorial.value, parseInt(txtFuerza.value), selectArma.value);
            if (confirm("¿Desea realizar la modificación?")) handlerUpdate(updatedSuper);
        }
        resetFormulario($formulario);
    } catch (error) {
        alert(error.message);
    }
}

function handlerCreate(nuevoSuper) {
    console.log("Creando");
    superheroes.push(nuevoSuper);

    actualizarTabla($seccionTabla, superheroes, colorHeader, identificador, titulo);
    actualizarStorage("superheroes", superheroes);
}

function handlerUpdate(editSuper) {
    console.log("Actualizando");

    let index = superheroes.findIndex((s) => s.id == editSuper.id);
    superheroes.splice(index, 1, editSuper);

    actualizarTabla($seccionTabla, superheroes, colorHeader, identificador, titulo);
    actualizarStorage("superheroes", superheroes);
}

function handlerDelete(id) {
    console.log("Eliminado");
    let index = superheroes.findIndex((superheroe) => superheroe.id == id);
    superheroes.splice(index, 1);

    actualizarTabla($seccionTabla, superheroes, colorHeader, identificador, titulo);
    actualizarStorage("superheroes", superheroes);
}

function actualizarStorage(clave, data) {
    localStorage.setItem(clave, JSON.stringify(data));
}

function cargarFormulario(formulario, superheroe) {
    const $titulo = document.getElementById("titulo-form");
    const $boton = document.getElementById("boton-accion");
    const $botonEliminar = document.getElementById("eliminar");
    $botonEliminar.style.display = "block";
    $titulo.textContent = "Modifcacion del SuperHeroe";
    $boton.value = "Modificar";
    formulario.txtId.value = superheroe.id;
    formulario.txtNombre.value = superheroe.nombre;
    formulario.txtAlias.value = superheroe.alias;
    formulario.radioEditorial.value = superheroe.editorial;
    formulario.txtFuerza.value = superheroe.fuerza;
    formulario.selectArma.value = superheroe.arma;
}

function resetFormulario(formulario) {
    const $titulo = document.getElementById("titulo-form");
    const $boton = document.getElementById("boton-accion");
    const $botonEliminar = document.getElementById("eliminar");
    $botonEliminar.style.display = "none";
    $titulo.textContent = "Informacion del SuperHeroe";
    $boton.value = "Cargar";
    formulario.txtId.value = '';
    const $botonera = document.getElementById('botonera');
    if (document.getElementById('boton-cancelar')) $botonera.removeChild(document.getElementById('boton-cancelar'));
    formulario.reset();
}






