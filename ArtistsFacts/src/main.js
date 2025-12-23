import './style.css';

const URL = "https://api.artic.edu/api/v1/artworks";

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