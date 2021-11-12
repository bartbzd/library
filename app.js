const submitBtn = document.querySelector(".submit");
const cardGrid = document.querySelector(".card-grid");
const bookForm = document.querySelector("form");
const modal = document.querySelector("#modal");
const exitBtn = document.querySelector(".close");
// const deleteBook = document.querySelector(".delete-book");
const newBookBtn = document.querySelector(".new-book-btn");
const mainDisplay = document.querySelector("main");
const totalBooks = document.querySelector("span");
const formTitle = document.querySelector(".form-title");
const checkBox = document.querySelector(".checkbox");
const container = document.querySelector("#container");

let myLibrary = [];
let bookIndex = 0;

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
function addBook() {
  const newBook = BookFromInput();
  if (newBook.title === "") {
    return;
  }
  myLibrary.push(newBook);
  updateLibrary();
  saveLibrary();

  modal.classList.toggle("show-modal");
  mainDisplay.classList.remove("blur");
  bookForm.reset();
}
function editBook() {
  const editedBook = BookFromInput();
  if (editedBook.title === "") {
    return;
  }
  myLibrary.splice(bookIndex, 1, editedBook);
  updateLibrary();
  saveLibrary();
  // submitBtn.textContent = "Add";
  modal.classList.toggle("show-modal");
  mainDisplay.classList.remove("blur");
  formTitle.textContent = "Add book";

  bookForm.reset();
}
function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("book-card");
  card.setAttribute("data-id", myLibrary.indexOf(book));

  const title = document.createElement("h2");
  title.classList.add("book-title");
  title.textContent = book.title;
  if (book.title.length > 30) {
    title.style.fontSize = "22px";
  }

  const author = document.createElement("h3");
  author.classList.add("book-author");
  author.textContent = book.author;
  const underline = document.createElement("hr");
  underline.classList.add("author-line");

  const page = document.createElement("h3");
  page.classList.add("book-page");
  page.textContent = book.page + " pages";

  const read = document.createElement("div");
  read.classList.add("read-section");
  const btns = document.createElement("div");
  btns.classList.add("btns");

  const readBtn = document.createElement("button");
  readBtn.classList.add("read-btn");
  const readIcon = document.createElement("i");
  readIcon.classList.add("far", "fa-check-square", "read-icon");
  const unreadIcon = document.createElement("i");
  unreadIcon.classList.add("far", "fa-square", "unread-icon");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  const editIcon = document.createElement("i");
  editIcon.classList.add("fas", "fa-edit", "fas-5x", "edit-icon");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash-alt", "fas-5x", "delete-icon");

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(underline);
  card.appendChild(page);

  card.appendChild(btns);
  if (book.read === true) {
    readBtn.appendChild(readIcon);
    readIcon.style.color = "#dbf067";
  } else {
    readBtn.appendChild(unreadIcon);
  }
  editBtn.appendChild(editIcon);
  deleteBtn.appendChild(deleteIcon);
  btns.appendChild(editBtn);
  btns.appendChild(readBtn);
  btns.appendChild(deleteBtn);
  cardGrid.appendChild(card);

  readBtn.addEventListener("mousedown", () => {
    book.toggleStatus();
    updateLibrary();
    saveLibrary();
  });

  editBtn.addEventListener("click", () => {
    formTitle.textContent = "Edit book";
    submitBtn.textContent = "Edit";
    checkBox.style.display = "none";
    openModal();
    bookIndex = myLibrary.indexOf(book);
  });

  deleteBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
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
function openModal() {
  modal.classList.toggle("show-modal");
  mainDisplay.classList.toggle("blur");
  if (submitBtn.textContent === "Add") {
    checkBox.style.display = "flex";
  }
}
function closeModal() {
  modal.classList.toggle("show-modal");
  mainDisplay.classList.toggle("blur");
  setTimeout(function () {
    submitBtn.textContent = "Add";
    formTitle.textContent = "Add book";
  }, 150);
}

newBookBtn.addEventListener("click", openModal);
exitBtn.addEventListener("click", closeModal);
submitBtn.addEventListener("click", () => {
  // modal.classList.add("show-modal");

  if (submitBtn.textContent === "Add") {
    addBook();
  } else {
    editBook();
  }
});
window.addEventListener("click", e => {
  if (e.target === modal) {
    closeModal();
  }
});
// window.addEventListener("touchstart", e => {
//   if (e.target === modal) {
//     closeModal();
//   }
// });

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
