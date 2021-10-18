let myLibrary = [
  {
    title: "Illustrated Man",
    author: "Ray Bradbury",
    pages: 300,
    read: false,
  },
  {
    title: "Illustrated",
    author: "Ray",
    pages: 300,
    read: true,
  },
  {
    title: "Illustrated Woman",
    author: "Ray Bradshaw",
    pages: 200,
    read: false,
  },
];

function Book(title, author, page, read) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
  this.info = function () {
    return `${title}, ${author}, ${page}, ${read}`; //
  };
}
const theHobbit = new Book("The Hobbit", "by J.R.R Tolkien", "295 pages", "not read yet");
console.log(theHobbit.info());

function addBookToLibrary() {
  let myBook = {
    title: prompt("Title?", ""),
    author: prompt("Author?", ""),
    pages: prompt("Pages?", ""),
    read: prompt("Have you read it?", ""),
  };
  let book = new Book();
  return myLibrary.push(myBook);
}
addBookToLibrary();
