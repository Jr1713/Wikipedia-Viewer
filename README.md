# Wikipedia Viewer 🔍

A web app that lets users search Wikipedia articles or open a random article.  
Displays search results (title + snippet) that link to the full Wikipedia page.  
Live demo: [Wikipedia Viewer by jr-delfin](https://codepen.io/jr-delfin/pen/GgorYBL) :contentReference[oaicite:0]{index=0}

---

## Table of Contents

1. What This Does  
2. Tools & Technologies Used  
3. How It Works  
4. API / Data Source  

---

## 1. What This Does

- Allows the user to input a search term and fetch related Wikipedia articles  
- Shows a list of search results, each with:
  - Title (linked to Wikipedia page)  
  - Snippet / brief excerpt  
- “Random Article” button opens a random Wikipedia page in a new tab  
- If no query or no results, shows appropriate message  
- Easily handles “Enter” key press in the search box  

---

## 2. Tools & Technologies Used

- **HTML5** — page structure, input field, buttons, results container :contentReference[oaicite:1]{index=1}  
- **CSS3** — styling, layout, responsive design, hover effects :contentReference[oaicite:2]{index=2}  
- **JavaScript (ES6+ / vanilla JS)** — event handling, fetching data, DOM updates :contentReference[oaicite:3]{index=3}  
- **Wikipedia API (MediaWiki API)** — for searching Wikipedia content (via `action=query&list=search`) :contentReference[oaicite:4]{index=4}  

---

## 3. How It Works

1. **User Input & Events**  
   - The input field (`#search-box`) listens for “Enter” key via `keydown` event.  
   - The **Search** button triggers a `searchWiki()` function.  
   - The **Random Article** button opens `https://en.wikipedia.org/wiki/Special:Random`. :contentReference[oaicite:5]{index=5}  

2. **Searching Wikipedia**  
   - `searchWiki()` reads the input value, trims whitespace, and validates it.  
   - If the query is empty, shows a “Please enter a search term.” message.  
   - Otherwise, displays a “Loading results...” placeholder.  
   - It fetches from the Wikipedia API with URL:  
     ```
     https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch={encodedQuery}&format=json
     ```  
   - Parses JSON response, extracts `data.query.search` array.  
   - If empty, shows “No results found. Try another search.”  
   - Otherwise calls `displayResults(results)`. :contentReference[oaicite:6]{index=6}

3. **Displaying Results**  
   - In `displayResults`, clear the old results container.  
   - For each result item:
     - Build a URL to the full page: `https://en.wikipedia.org/wiki/{encodedTitle}`  
     - Clean up the snippet: remove HTML tags like `<span>`  
     - Create a `.result-item` div with:
       - `<a>` linking to the Wikipedia page (opens in new tab)  
       - A `<p>` containing the snippet + “…”  
     - Append to the results container. :contentReference[oaicite:7]{index=7}

4. **Error Handling**  
   - `.catch()` in fetch handles failed network or parsing errors, showing a fallback message  
   - The UI shows error / no results messages appropriately :contentReference[oaicite:8]{index=8}  

---

## 4. API / Data Source

- Uses the **Wikipedia MediaWiki API** via endpoint:
https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch={query}&format=json

- `origin=*` is required for cross-origin requests.  
- `list=search` with `srsearch` is the parameter to query articles.  
- The API returns search results with titles, snippets, etc. :contentReference[oaicite:9]{index=9}  
- Also uses the **Special:Random** endpoint to open a random article:  
`https://en.wikipedia.org/wiki/Special:Random` :contentReference[oaicite:10]{index=10}  
