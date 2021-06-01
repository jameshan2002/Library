const popUpForm = document.getElementById("popup");

const newBtn = document.getElementById("newBtn");
newBtn.addEventListener('click', () => popUpForm.style.display = 'block');

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', addBookToLibrary);

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
let newBook;

function addBookToLibrary() {
    if (title.value.length === 0 || author.value.length === 0 || pages.value.length === 0) {
        alert("Please, fill all the fields");
        event.preventDefault();
        return;
      }
      else if (isNaN(pages.value)) 
      {
        alert("Your \"pages\" input should be in numbers.");
        event.preventDefault();
        return;
      }

    event.preventDefault();
    popUpForm.style.display = 'none';

    newBook = new Book(title, author, pages, read); 
    myLibrary.push(newBook); 
    updateLocalStorage();
    render();
    form.reset();
}

function updateFirebase() {
    let firebaseRef = firebase.database().ref();
    let titleing = title.value;
    firebaseRef.child("text").set(titleing);
}


function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function render()
{
    if(localStorage.myLibrary) {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    }
    
    const display = document.getElementById('Library-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
    
    let arrayCount = myLibrary ? myLibrary.length : 0;
    for (let i = 0; i < arrayCount; i++){
       createBook(myLibrary[i]);
    }
    
}

function createBook(item) {
    const library = document.getElementById("Library-container");
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    
    
    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authDiv.textContent = item.author;
    authDiv.classList.add('author');
    bookDiv.appendChild(authDiv);

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    readBtn.classList.add('readBtn');    
    bookDiv.appendChild(readBtn);

    if(item.read===false) {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#FF4136';
    }else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#2ECC40'
    }

    removeBtn.textContent = 'Remove'; 
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(removeBtn);
    
    library.appendChild(bookDiv);


    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        updateLocalStorage();
        render();
    });

    //add toggle ability to each book 'read' button on click
    readBtn.addEventListener('click', () => { 
        item.read = !item.read; 
        updateLocalStorage(); 
        render();
    }); 
}

render();