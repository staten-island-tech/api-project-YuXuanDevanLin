import './style.css';

// Fetch a random useless fact on page load
async function getRandomFact() {
  try {
    const response = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );

    const data = await response.json();

    console.log("Random fact:", data);
  } catch (error) {
    console.error("Error fetching random fact:", error);
  }
}

// Fetch facts based on user search
async function searchFacts(query) {
  if (query.trim() === "") {
    alert("Please enter a search term.");
    return;
  }

  try {
    const response = await fetch(
      `https://uselessfacts.jsph.pl/search.json?query=${query}&language=en`
    );

    const data = await response.json();

    console.log("Search results:", data);
  } catch (error) {
    console.error("Error searching facts:", error);
  }
}

// Button click handler
document.getElementById("searchBtn").addEventListener("click", () => {
  const userInput = document.getElementById("searchInput").value;
  searchFacts(userInput);
});

// Run when page loads
getRandomFact();