export const crearTabla = (data, colorHeader, identidicador) => {
    const tabla = document.createElement('table');

    if (!Array.isArray(data) || data.length < 1) return null;
    tabla.appendChild(crearCabecera(data[0], colorHeader, identidicador));
    tabla.appendChild(crearCuerpo(data, identidicador));
    return tabla;
};

const crearCabecera = (elemento, color, identidicador) => {
    const tHead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.style.setProperty("background-color", color);

    for (const propiedad in elemento) {
        if (propiedad === identidicador) continue;
        const th = document.createElement('th');
        th.textContent = propiedad;
        headRow.appendChild(th);
    }

    tHead.appendChild(headRow);

    return tHead;
};

const crearCuerpo = (data, identidicador) => {
    const tBody = document.createElement('tbody');

    data.forEach((elemento, index) => {
        const tr = document.createElement('tr');

        if (index % 2 == 0) tr.classList.add('filaPar');
        for (const propiedad in elemento) {
            if (propiedad === identidicador) {
                tr.setAttribute(`data-id`, elemento[propiedad]);
            } else {
                const td = document.createElement('td');
                td.textContent = elemento[propiedad];
                tr.appendChild(td);
            }
        }
        tBody.appendChild(tr);
    });

    return tBody;
};

export const actualizarTabla = (contenedor, data, colorHeader, identidicador, titulo) => {
    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild);
    }
    const spinner = document.createElement('span');
    spinner.classList.add('loader');
    spinner.id = "spinner";
    spinner.style.setProperty("display", "block");
    contenedor.appendChild(spinner);

    setTimeout(() => {
        spinner.style.setProperty("display", "none");
        const h2 = document.createElement('h2');
        h2.textContent = titulo;
        contenedor.appendChild(h2);
        contenedor.appendChild(crearTabla(data, colorHeader, identidicador));
    }, 2000);
};

