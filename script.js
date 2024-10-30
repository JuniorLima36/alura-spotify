// Mensagem do dia
const greetingElement = document.getElementById("greeting");

const currentHour = new Date().getHours();
const greetingMessage =
  currentHour >= 5 && currentHour < 12
    ? "Bom dia"
    : currentHour >= 12 && currentHour < 18
    ? "Boa tarde"
    : "Boa noite";

greetingElement.textContent = greetingMessage;

// Grid resp container
const container = document.querySelector(".box-grid");

const observer = new ResizeObserver(() => {  
  const containerWidth = container.offsetWidth;
  const numColumns = Math.floor(containerWidth / 200);

  container.style.gridTemplateColumns = `repeat(${numColumns}, minmax(200px, 1fr))`;
});

observer.observe(container);

// Cores dos cards
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function applyRandomBackgroundColors() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.backgroundColor = getRandomColor();
  });
}

window.onload = applyRandomBackgroundColors;


// Busca de musicas
document.getElementById("search").addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase();
  const layoutGrid = document.getElementById("layout-grid");
  const resultSearch = document.getElementById("result-search");
  const containerGrid = document.getElementById("container-grid");

  if (query) {
    layoutGrid.style.display = "none"; 
    containerGrid.style.display = "none"; 
    resultSearch.style.display = "block"; 
    searchArtist(query); 
  } else {
    resultSearch.style.display = "none";
    layoutGrid.style.display = "block"; 
    containerGrid.style.display = "block";
  }
});

function searchArtist(query) {
  fetch("https://6721849398bbb4d93ca89c8f.mockapi.io/artists")
    .then(response => response.json())
    .then(data => {
      const result = data.find(artist => artist.name.toLowerCase().includes(query) || artist.genre.toLowerCase().includes(query));
      
      if (result) {
        document.getElementById("result-search").innerHTML = `
          <article class="card-artist">
            <img class="photo" src="${result.urlImg}" alt="${result.name}">
            <section class="card-button">
              <button type="button" id="button-play">
                <img class="play" src="assets/play.png" alt="Play">
              </button>
            </section>
            <h2>${result.name}</h2>
            <span>${result.genre}</span>
          </article>
        `;
      } else {
        document.getElementById("result-search").innerHTML = `<p>Nenhum resultado encontrado para "${query}"</p>`;
      }
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
}
