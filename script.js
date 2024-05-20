const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "a6b19360";
const APP_Key = "299adea95ee4ceecce06ce74bf39139b";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Key}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove('initial')
  let generatedHTML = '';
  results.map((result) => {
    generatedHTML += 
    `
    <div class="item">
    <img src="${result.recipe.image}" alt="Food Item">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${result.recipe.url}" targets = '_blank' >View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
        <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
    </div>
    `
  });
  searchResultDiv.innerHTML = generatedHTML;
}
