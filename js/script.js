//get all element from HTML
const form = document.getElementById("artForm");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const message = document.getElementById("message");
const result = document.getElementById("result");

//event 1
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const keyword = searchInput.value.trim();

  if (keyword === "") {
    showMessage("Please enter a keyword.", "error");
    return;
  }
  //call function to excuet
  searchArtworks(keyword);
});

//event 2
clearBtn.addEventListener("click", function () {
  result.innerHTML = "";
  message.textContent = "";
  searchInput.value = "";
});

//event 3
searchInput.addEventListener("input", function () {
  if (searchInput.value.length > 0) {
    message.textContent = "";
  }
});

//the function fetch data from API based on the keyword
async function searchArtworks(keyword) {
  try {
    result.innerHTML = "";
    showMessage("Loading artwork...", "loading");

    const searchRes = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&q=${keyword}`
    );

    if (!searchRes.ok) {
      throw new Error("Search request failed");
    }

    // convert the data to json form
    const searchData = await searchRes.json();

    if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
      showMessage("No artworks found. Try another keyword.", "error");
      return;
    }
    //get random number
    const randomIndex = Math.floor(Math.random() * searchData.objectIDs.length);
    const id = searchData.objectIDs[randomIndex];

    const artRes = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    );

    if (!artRes.ok) {
      throw new Error("Artwork details request failed");
    }

    const art = await artRes.json();

    //to show the message in browser
    result.innerHTML = "";
    createArtworkCard(art);
    showMessage("Artwork loaded successfully.", "success");

    //to handel the error
  } catch (err) {
    console.log(err);
    result.innerHTML = "";
    showMessage("Something went wrong. Please try again.", "error");
  }
}


//the fuction show all data from API into browser
function createArtworkCard(art) {
  const card = document.createElement("div");
  card.classList.add("art-card");

  const imageUrl =
    art.primaryImageSmall ||
    art.primaryImage ||
    "assets/placeholder.jpg";

    //form of the data 
  card.innerHTML = `
    <img 
      src="${imageUrl}" 
      alt="${art.title || "Artwork"}"
      onerror="this.src='assets/placeholder.jpg'"
    />

    <div class="art-info">
      <h3>${art.title || "Untitled"}</h3>
      <p><strong>Artist:</strong> ${art.artistDisplayName || "Unknown"}</p>
      <p><strong>Date:</strong> ${art.objectDate || "Unknown"}</p>
      <p><strong>Department:</strong> ${art.department || "Unknown"}</p>
      <p><strong>Type:</strong> ${art.objectName || "Unknown"}</p>
    </div>
  `;

  result.appendChild(card);
}

//to show the message 
function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;

}