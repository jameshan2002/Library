const popUpForm = document.getElementById("popup");

const newBtn = document.getElementById("newBtn");
newBtn.addEventListener('click', () => popUpForm.style.display = 'block');

// Get the <span> element that closes the popup
const closePopUp = document.getElementsByClassName("close")[0];
closePopUp.addEventListener('click', () => popUpForm.style.display = 'none');

//Book Constructor
class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value; 
        this.author = form.author.value; 
        this.pages = form.pages.value + 'pg'; 
        this.read = form.read.checked; 
    }
}

let myLibrary = [];


function addBookToLibrary() {
  // do stuff here
}