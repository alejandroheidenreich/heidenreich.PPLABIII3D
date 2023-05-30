// import { Anuncio } from './js/anuncio.js';
import { crearListaSuperHeroes } from './displayAnuncio.js';

const superheroes = JSON.parse(localStorage.getItem('superheroes')) || [];
const $seccionPersonajes = document.getElementById('seccion-personajes');
const campoPrincipal = "alias";
const campoOculto = "id";
crearListaSuperHeroes($seccionPersonajes, superheroes, campoPrincipal, campoOculto);