import './style.css';

document.addEventListener("DOMContentLoaded", () => {

  const API_URL = "https://emojihub.yurace.pro/api/all";

  const emojiContainer = document.getElementById("emojiContainer");
  const form = document.getElementById("searchForm");
  const groupSelect = document.getElementById("group");

  const modal = document.getElementById("modal");
  const modalEmoji = document.getElementById("modalEmoji");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalGroup = document.getElementById("modalGroup");
  const closeModal = document.getElementById("closeModal");

  let emojiData = [];

  // --------------------
  // FETCH API
  // --------------------
  async function getData(url) {
    const response = await fetch(url);
    return await response.json();
  }

  // --------------------
  // INITIAL LOAD
  // --------------------
  async function init() {
    emojiData = await getData(API_URL);
    displayEmojis(emojiData.slice(0, 40));
  }

  init();

  // --------------------
  // DISPLAY EMOJIS
  // --------------------
  function displayEmojis(emojis) {
    emojiContainer.innerHTML = "";

    emojis.forEach((emoji) => {
      const span = document.createElement("span");
      span.innerHTML = emoji.htmlCode[0];
      span.style.margin = "9px";
      span.style.fontSize = "3.8rem";
      span.className =
        "text-3xl cursor-pointer transition-transform hover:scale-125 ";

      span.addEventListener("click", () => {
        modalEmoji.innerHTML = emoji.htmlCode[0];
        modalTitle.textContent = emoji.name;
        modalCategory.textContent = `Category: ${emoji.category}`;
        modalGroup.textContent = `Group: ${emoji.group}`;
        modal.classList.remove("hidden");
      });

      emojiContainer.appendChild(span);
    });
  }

  // --------------------
  // SEARCH / FILTER
  // --------------------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedGroup = groupSelect.value;

    if (selectedGroup === "") {
      alert("Please select a group");
      return;
    }

    if (selectedGroup === "all") {
      displayEmojis(emojiData);
    } else {
      const filtered = emojiData.filter(
        (emoji) => emoji.group === selectedGroup
      );
      displayEmojis(filtered);
    }
  });

  // --------------------
  // CLOSE MODAL
  // --------------------
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

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