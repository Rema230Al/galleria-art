const form = document.getElementById("artForm");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const message = document.getElementById("message");
const result = document.getElementById("result");


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const keyword = searchInput.value.trim();

//   if (keyword === "") {
//     showMessage("Please enter a keyword.", "error");
//     return;
//   }

  searchArtworks(keyword);
});

clearBtn.addEventListener("click", function () {
  result.innerHTML = "";
  message.textContent = "";
  searchInput.value = "";
});

searchInput.addEventListener("input", function () {
  if (searchInput.value.length > 0) {
    message.textContent = "";
  }
});


async function searchArtworks(keyword) {
  try {
   

    const searchRes = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&q=${keyword}`
    );

    const searchData = await searchRes.json();

    const id = searchData.objectIDs[0];
    const artRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
                            );

    const art = await artRes.json();
    createArtworkCard(art);



  } catch (err) {
    console.log(err);
    console.log("Something went wrong!", "error");
  }
}


function createArtworkCard(art) {
  const card = document.createElement("div");
  card.classList.add("art-card");

  const imageUrl =
    art.primaryImageSmall ||
    art.primaryImage ||
    "assets/placeholder.jpg";

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

// function showMessage(text, type) {
//   message.textContent = text;
//   message.className = "message " + type;
// }