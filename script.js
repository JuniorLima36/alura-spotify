const greetingElement = document.getElementById("greeting");
const currentHour = new Date().getHours();
greetingElement.textContent =
  currentHour < 12 ? "Bom dia" :
  currentHour < 18 ? "Boa tarde" : "Boa noite";

const container = document.querySelector(".box-grid");
const observer = new ResizeObserver(() => {
  const numColumns = Math.floor(container.offsetWidth / 200);
  container.style.gridTemplateColumns = `repeat(${numColumns}, minmax(200px, 1fr))`;
});
observer.observe(container);

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function randomBgColor() {
  document.querySelectorAll('.card').forEach(card => {
    card.style.backgroundColor = getRandomColor();
  });
}

window.onload = randomBgColor;

document.getElementById("search").addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase();
  const layoutGrid = document.getElementById("layout-grid");
  const resultSearch = document.getElementById("result-search");
  const containerGrid = document.getElementById("container-grid");

  layoutGrid.style.display = query ? "none" : "block";
  containerGrid.style.display = query ? "none" : "block";
  resultSearch.style.display = query ? "block" : "none";
  
  if (query) searchArtist(query);
});

function searchArtist(query) {
  fetch("https://6721849398bbb4d93ca89c8f.mockapi.io/artists")
    .then(response => response.json())
    .then(data => {
      const result = data.find(artist => 
        artist.name.toLowerCase().includes(query) || artist.genre.toLowerCase().includes(query)
      );
      document.getElementById("result-search").innerHTML = result ?
        `<article class="card-artist">
          <img class="photo" src="${result.urlImg}" alt="${result.name}">
          <section class="card-button">
            <button type="button" id="button-play">
              <img class="play" src="assets/play.png" alt="Play">
            </button>
          </section>
          <h2>${result.name}</h2>
          <span>${result.genre}</span>
        </article>` :
        `<p>Nenhum resultado encontrado para "${query}"</p>`;
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
}
