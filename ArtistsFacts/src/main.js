import './style.css';

const URL = "https://emojihub.yurace.pro/api/all";
const emojiContainer = document.getElementById("emojiContainer");
const form = document.getElementById("searchForm");
const groupSelect = document.getElementById("group");

let emojiData = [];

async function fetchEmojis() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    emojiData = await response.json();
    displayEmojis(emojiData.slice(0, 20));

  } catch (error) {
    emojiContainer.textContent = error.message;
  }
}

fetchEmojis();

function displayEmojis(emojis) {
  emojiContainer.innerHTML = "";

  emojis.forEach(emoji => {
    const span = document.createElement("span");
    span.innerHTML = emoji.htmlCode[0];
    span.style.fontSize = "2rem";
    span.style.margin = "5px";
    emojiContainer.appendChild(span);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedGroup = groupSelect.value;

  if (selectedGroup === "") {
    alert("Please choose a group");
    return;
  }

  const filteredEmojis = emojiData.filter(
    emoji => emoji.group === selectedGroup
  );

  displayEmojis(filteredEmojis);
});

async function getData(URL) {
  try {
    const response = await fetch(URL);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json(); //makes the data into JSON object we can use
      console.log(data);
    }
  } catch (error) {
    console.log(error);
    console.log("no bueno");
  }
}
getData(URL);