export function crearListaSuperHeroes(contenedor, superheroes, principal, campoOculto) {

    superheroes.forEach((element) => {
        contenedor.appendChild(crearSuperHeroes(element, principal, campoOculto));

    });

}
function crearSuperHeroes(superheroes, principal, campoOculto) {

    const fieldset = document.createElement('fieldset');

    if (principal in superheroes) {
        const h2 = document.createElement('h2');
        h2.textContent = superheroes[principal];
        fieldset.appendChild(h2);
    }
    else {
        return null;
    }

    for (const propiedad in superheroes) {
        if (propiedad === principal || propiedad === campoOculto) continue;
        const p = document.createElement('p');
        p.textContent = capitalizeString(propiedad) + ": " + superheroes[propiedad];
        fieldset.appendChild(p);
    }


    return fieldset;
}

function capitalizeString(string) {
    let stringCapitalized = string.toLowerCase();

    stringCapitalized = stringCapitalized.charAt(0).toUpperCase() + stringCapitalized.slice(1);;

    return stringCapitalized;
}