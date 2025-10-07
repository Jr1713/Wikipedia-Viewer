// script.js

const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const randomBtn = document.getElementById("random-btn");
const resultsDiv = document.getElementById("results");

const API_URL = "https://en.wikipedia.org/w/api.php?origin=*";

// Handle search button click
searchBtn.addEventListener("click", searchWiki);

// Handle Enter key in search box
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchWiki();
});

// Random Article
randomBtn.addEventListener("click", () => {
  window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
});

// Search Wikipedia function
function searchWiki() {
  const query = searchBox.value.trim();
  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  resultsDiv.innerHTML = "<p>Loading results...</p>";

  fetch(
    `${API_URL}&action=query&list=search&srsearch=${encodeURIComponent(
      query
    )}&format=json`
  )
    .then((res) => res.json())
    .then((data) => {
      const results = data.query.search;

      if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No results found. Try another search.</p>";
        return;
      }

      displayResults(results);
    })
    .catch(() => {
      resultsDiv.innerHTML = "<p>Failed to fetch results. Try again.</p>";
    });
}

// Display search results
function displayResults(results) {
  resultsDiv.innerHTML = "";

  results.forEach((item) => {
    const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(
      item.title
    )}`;
    const snippet = item.snippet.replace(/<\/?span[^>]*>/g, "");

    const resultItem = document.createElement("div");
    resultItem.className = "result-item";
    resultItem.innerHTML = `
      <a href="${url}" target="_blank">${item.title}</a>
      <p>${snippet}...</p>
    `;
    resultsDiv.appendChild(resultItem);
  });
}
