const submitBtn = document.querySelector("#submit");
const cardGrid = document.querySelector(".card-grid");
const bookForm = document.querySelector("form");
const formModal = document.querySelector(".modal");
const addBookBtn = document.createElement("button");
addBookBtn.textContent = "New";
const mainDisplay = document.querySelector("main").append(addBookBtn);

let myLibrary = [];

function Book(title, author, page, read) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}

function BookFromInput() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  return new Book(title, author, pages, read);
}

function openForm() {
  bookForm.classList.remove("hidden");
  formModal.style.display = "block";
}
function addBook(e) {
  e.preventDefault();
  const newBook = BookFromInput();
  if (newBook.title === "" || newBook.author === "" || newBook.page === "") {
    return;
  }
  myLibrary.push(newBook);
  console.log(myLibrary);
  updateLibrary();
  bookForm.classList.add("hidden");
  bookForm.classList.remove("form");
  formModal.style.display = "none";
}

function updateLibrary() {
  resetLibrary();
  myLibrary.forEach((book, i) => {
    const card = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const page = document.createElement("p");
    const read = document.createElement("p");
    title.textContent = myLibrary[i].title;
    author.textContent = myLibrary[i].author;
    page.textContent = myLibrary[i].page;
    read.textContent = myLibrary[i].read;

    card.classList.add("book-card");
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(page);
    cardGrid.appendChild(card);
  });
}

function resetLibrary() {
  cardGrid.innerHTML = "";
}

function createBookCard() {}

function addBookModal() {
  const header = document.createElement("h2");

  header.textContent = "Add a new book";
}
submitBtn.addEventListener("click", addBook);
addBookBtn.onclick = openForm;
//
