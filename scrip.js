const API_URL = "https://ghibliapi.vercel.app/films";

let peliculas = [];

async function cargarPeliculas() {
    try {
        const respuesta = await fetch(API_URL);
        peliculas = await respuesta.json();
        mostrarPeliculas(peliculas);
    } catch (error) {
        console.error("Error al cargar las películas:", error);
        document.getElementById("peliculas").innerHTML = `
            <p class="text-center">No se pudieron cargar las películas.</p>
        `;
    }
}

function mostrarPeliculas(lista) {
    const contenedor = document.getElementById("peliculas");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `<p class="text-center">No se encontraron resultados.</p>`;
        return;
    }

    lista.forEach(pelicula => {
        const columna = document.createElement("div");
        columna.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center";

        columna.innerHTML = `
            <div class="card h-100">
                <img src="${pelicula.image}" class="card-img-top" alt="${pelicula.title}">
                <div class="card-body">
                    <h5 class="card-title">${pelicula.title}</h5>
                    <p class="card-text"><strong>Director:</strong> ${pelicula.director}</p>
                    <p class="card-text"><strong>Año:</strong> ${pelicula.release_date}</p>
                    <p class="card-text"><strong>Puntuación:</strong> ${pelicula.rt_score}</p>
                </div>
            </div>
        `;

        contenedor.appendChild(columna);
    });
}

document.getElementById("buscador").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    const filtradas = peliculas.filter(pelicula =>
        pelicula.title.toLowerCase().includes(texto)
    );

    mostrarPeliculas(filtradas);
});

cargarPeliculas();