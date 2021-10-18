let myLibrary = [
    {
        title = "Illustrated Man",
        author= "Ray Bradbury",
        pages = 300,
        read = false,
}, {
        title = "Illustrated",
        author= "Ray",
        pages = 300,
        read = true,
}, {
        title = "Illustrated Woman",
        author= "Ray Bradshaw",
        pages = 200,
        read = false,
}];

function Book(title, author, page, read) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
  this.info = function () {
    return `${title}, ${author}, ${page}, ${read}`; //
  };
}
const theHobbit = new book("The Hobbit", "by J.R.R Tolkien", "295 pages", "not read yet");
console.log(theHobbit.info());

function addBookToLibrary() {}

function Student(name, grade) {
  this.name = name;
  this.grade = grade;
  this.sayName = function () {
    console.log(this.name);
  };
}
const player1 = new Student("Bart", 4);
console.log(player1);
