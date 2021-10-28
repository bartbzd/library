const submitBtn = document.querySelector("#submit");
const cardGrid = document.querySelector(".card-grid");
const bookForm = document.querySelector("form");
const formModal = document.querySelector(".modal");
const exitModal = document.querySelector(".close");
// const deleteBook = document.querySelector(".delete-book");
const addBookBtn = document.createElement("button");
addBookBtn.textContent = "New";
const mainDisplay = document.querySelector("main").append(addBookBtn);
const totalBooks = document.querySelector("span");

let myLibrary = [];
function totalBookCount() {
  totalBooks.textContent = myLibrary.length;
}

function Book(title, author, page, read) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}
Book.prototype.toggleStatus = function () {
  this.read = !this.read;
};
function BookFromInput() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  return new Book(title, author, pages, read);
}
function addBook(e) {
  e.preventDefault();
  const newBook = BookFromInput();
  if (newBook.title === "") {
    return;
  }
  myLibrary.push(newBook);
  updateLibrary();
  saveLibrary();

  bookForm.classList.add("hidden");
  bookForm.classList.remove("form");
  formModal.style.display = "none";
  bookForm.reset();
}
function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("book-card");
  card.setAttribute("data-id", myLibrary.indexOf(book));

  const title = document.createElement("h2");
  title.classList.add("book-title");
  title.textContent = book.title;

  const author = document.createElement("h3");
  author.textContent = book.author;

  const page = document.createElement("h4");
  page.textContent = book.page + " pgs";

  const readBtn = document.createElement("button");
  if (book.read === true) {
    readBtn.textContent = "read";
  } else {
    readBtn.textContent = "unread";
  }
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(page);
  card.appendChild(readBtn);
  card.appendChild(deleteBtn);
  cardGrid.appendChild(card);

  deleteBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    updateLibrary();
    saveLibrary();
  });
  readBtn.addEventListener("click", () => {
    book.toggleStatus();
    updateLibrary();
    saveLibrary();
  });
}
function updateLibrary() {
  resetLibrary();
  totalBookCount();
  myLibrary.forEach(book => {
    createCard(book);
  });
}
function resetLibrary() {
  cardGrid.innerHTML = "";
}
function openForm() {
  bookForm.classList.remove("hidden");
  formModal.style.display = "block";
}
function closeModal() {
  formModal.style.display = "none";
}
submitBtn.addEventListener("click", addBook);
addBookBtn.addEventListener("click", openForm);
exitModal.addEventListener("click", closeModal);

//localStorage
function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function findLibrary() {
  if (!localStorage.myLibrary) {
    myLibrary = [];
  } else {
    getLibrary();
  }
}

function getLibrary() {
  const storedLibrary = localStorage.getItem("myLibrary");
  myLibrary = JSON.parse(storedLibrary);
  myLibrary = myLibrary.map(book => new Book(book.title, book.author, book.page, book.read));

  updateLibrary();
}
findLibrary();
