// Getting the elements
let website = document.querySelector("#website");
let url = document.querySelector("#url");
let bookmark = document.querySelector("#bookmark");
let container = document.querySelector(".container");

// --- Load saved bookmarks on page load ---
document.addEventListener("DOMContentLoaded", loadBookmarks);

// Function to add bookmarks
function addBookmark(website, url) {
  if (url.value.startsWith("https://") || url.value.startsWith("http://")) {
    const bookmarkData = {
      name: website.value,
      link: url.value
    };

    createBookmarkElement(bookmarkData);
    saveBookmark(bookmarkData);

    // Clear inputs
    url.value = "";
    website.value = "";
  } else {
    alert("Please enter a valid URL");
    url.value = "";
  }
}

// Create and insert DOM element for a bookmark
function createBookmarkElement(bookmarkData) {
  let container2 = document.createElement("div");
  container2.classList.add("container2");

  container2.innerHTML = `
    <li>
      <a href="${bookmarkData.link}" target="_blank">${bookmarkData.name}</a>
      <button type="button" class="btn btn-danger">Remove</button>
    </li>
  `;

  container.appendChild(container2);

  // Delete handler
  let remove = container2.querySelector(".btn-danger");
  remove.addEventListener("click", () => {
    container2.remove();
    removeBookmark(bookmarkData.link);
  });
}

// --- LocalStorage Functions ---
function saveBookmark(bookmarkData) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.push(bookmarkData);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function removeBookmark(link) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks = bookmarks.filter(b => b.link !== link);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.forEach(createBookmarkElement);
}

// --- Event listeners ---
bookmark.addEventListener("click", () => {
  addBookmark(website, url);
});

// Pressing Enter also bookmarks the website
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBookmark(website, url);
  }
});
