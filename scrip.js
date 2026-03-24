const API_URL = "https://ghibliapi.vercel.app/films";

let peliculas = [];

async function cargarPeliculas() {
    try {
        const res = await fetch(API_URL);
        peliculas = await res.json();
        mostrarPeliculas(peliculas);
    } catch (error) {
        console.error("Error al cargar películas:", error);
    }
}

function mostrarPeliculas(lista) {
    const contenedor = document.getElementById("peliculas");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron resultados</p>";
        return;
    }

    lista.forEach(peli => {
        const col = document.createElement("div");
        col.classList.add("col-md-3");

        col.innerHTML = `
            <div class="card h-100 shadow">
                <img src="${peli.image}" class="card-img-top" alt="${peli.title}">
                <div class="card-body">
                    <h5 class="card-title">${peli.title}</h5>
                    <p><strong>Director:</strong> ${peli.director}</p>
                    <p><strong>Año:</strong> ${peli.release_date}</p>
                    <p><strong>Puntuación:</strong> ${peli.rt_score}</p>
                </div>
            </div>
        `;

        contenedor.appendChild(col);
    });
}

document.getElementById("buscador").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    const filtradas = peliculas.filter(p =>
        p.title.toLowerCase().includes(texto)
    );

    mostrarPeliculas(filtradas);
});

cargarPeliculas();