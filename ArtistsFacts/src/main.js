import './style.css';

// ==========================
// Global Variables (Rubric)
// ==========================
const API_URL = "https://emojihub.yurace.pro/api/all";

const emojiContainer = document.getElementById("emojiContainer");
const form = document.getElementById("searchForm");
const groupSelect = document.getElementById("group");

let emojiData = []; // stores API data for reuse


// ==========================
// Reusable Fetch Function
// (Promise Handling + Modern Code)
// ==========================
async function getData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data; // IMPORTANT: return the data

  } catch (error) {
    console.error(error);
    emojiContainer.textContent = "Error loading emojis.";
  }
}


// ==========================
// Initialize App on Page Load
// (API call on load)
// ==========================
async function init() {
  emojiData = await getData(API_URL);

  if (emojiData && emojiData.length > 0) {
    displayEmojis(emojiData.slice(0, 20)); // array method
  }
}

init();


// ==========================
// Display Emojis Function
// (Array Methods + Reusable Code)
// ==========================
function displayEmojis(emojis) {
  emojiContainer.innerHTML = "";

  emojis.forEach((emoji) => {
    const span = document.createElement("span");
    span.innerHTML = emoji.htmlCode[0];
    span.style.fontSize = "2rem";
    span.style.margin = "5px";
    emojiContainer.appendChild(span);
  });
}


// ==========================
// Form Handling (User Input)
// ==========================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedGroup = groupSelect.value;

  if (selectedGroup === "") {
    alert("Please select a group");
    return;
  }

  const filteredEmojis = emojiData.filter(
    (emoji) => emoji.group === selectedGroup
  );

  displayEmojis(filteredEmojis);
});


//the information below is just for if i need it later

// async function getData(URL) {
//   try {
//     const response = await fetch(URL);
//     if (response.status != 200) {
//       throw new Error(response);
//     } else {
//       const data = await response.json(); //makes the data into JSON object we can use
//       console.log(data);
//     }
//   } catch (error) {
//     console.log(error);
//     console.log("no bueno");
//   }
// }
// getData(URL);