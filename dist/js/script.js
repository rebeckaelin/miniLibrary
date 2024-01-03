var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let overlay;
function getBookData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books");
            let bookData = yield response.json();
            createBookElement(bookData);
            searchBook(bookData);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log("Error", error.message);
            }
            else {
                console.log("Unknown error", error);
            }
        }
    });
}
getBookData();
function createBookElement(bookArray) {
    bookArray.forEach((book) => {
        const bookCollection = document.querySelector(".book-collection");
        let bookElement = document.createElement("div");
        bookElement.className = "book";
        let coverTitle = document.createElement("h3");
        coverTitle.textContent = book.title;
        bookCollection.append(bookElement);
        bookCollection.append(coverTitle);
        addClickEvent(bookElement, book);
    });
}
function addClickEvent(bookElement, book) {
    bookElement.addEventListener("click", () => {
        createBookInfo(book);
    });
}
function searchBook(bookData) {
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchField = document.getElementById("search");
        let searchValue = searchField.value.toLowerCase();
        let foundBooks = bookData.filter((book) => book.title.toLowerCase().includes(searchValue));
        if (foundBooks.length >= 2) {
            foundBooks.forEach((book) => {
                let result = document.createElement("div");
                result.className = "search-result";
                result.append(book.title);
                console.log("sökresultat");
            });
        }
        if (foundBooks.length === 1) {
            foundBooks.forEach((book) => {
                createBookInfo(book);
            });
        }
        else {
            console.log("Ingen bok hittades med den söksträngen");
        }
        searchField.value = "";
    });
}
function createBookInfo(clickedBook) {
    overlay = addOverlay();
    let infoPage = document.createElement("article");
    let details = document.createElement("section");
    let closeButton = document.createElement("button");
    let title = document.createElement("h1");
    let author = document.createElement("h4");
    let plot = document.createElement("p");
    let audience = document.createElement("p");
    let published = document.createElement("p");
    let numOfPages = document.createElement("p");
    let publisher = document.createElement("p");
    title.textContent = `${clickedBook.title}`;
    author.textContent = `Author: ${clickedBook.author}`;
    plot.textContent = `${clickedBook.plot}`;
    audience.textContent = `Audience: ${clickedBook.audience}`;
    if (clickedBook.year) {
        published.textContent = `Published: ${clickedBook.year}`.toString();
    }
    else {
        published.textContent = " Published: N/A";
    }
    if (clickedBook.pages) {
        numOfPages.textContent = `Pages: ${clickedBook.pages}`.toString();
    }
    else {
        numOfPages.textContent = "Pages: N/A";
    }
    publisher.textContent = `Publisher: ${clickedBook.publisher}`;
    closeButton.textContent = "←";
    closeButton.addEventListener("click", () => {
        infoPage.remove();
        overlay.remove();
    });
    infoPage.style.borderStyle = "solid";
    infoPage.style.borderWidth = "10px";
    infoPage.style.borderColor = clickedBook.color;
    document.body.appendChild(infoPage);
    infoPage.appendChild(closeButton);
    infoPage.appendChild(title);
    infoPage.appendChild(author);
    infoPage.appendChild(plot);
    infoPage.appendChild(details);
    details.appendChild(audience);
    details.appendChild(published);
    details.appendChild(numOfPages);
    details.appendChild(publisher);
}
function addOverlay() {
    overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
    return overlay;
}
export {};
