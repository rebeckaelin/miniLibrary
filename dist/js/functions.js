var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getBookData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books");
        let bookData = yield response.json();
        return bookData;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error", error.message);
        }
        else {
            console.log("Unknown error", error);
            return [];
        }
    }
});
const createBookElement = (bookArray) => {
    const searchForm = document.getElementById("search");
    searchForm.addEventListener("keyup", () => {
        searchBook(searchForm.value);
    });
    bookArray.forEach((book) => {
        const bookCollection = document.querySelector(".book-collection");
        const bookWrapper = document.createElement("div");
        bookWrapper.className = "book-wrapper";
        const bookElement = document.createElement("div");
        bookElement.className = "book";
        let coverTitle = document.createElement("h3");
        coverTitle.textContent = book.title;
        bookWrapper.append(bookElement, coverTitle);
        bookCollection.append(bookWrapper);
        bookElement.addEventListener("click", () => {
            createBookInfo(book);
        });
    });
};
const searchBook = (keyword) => {
    const bookElements = document.querySelectorAll(".book-wrapper");
    let isMatchFound = false;
    bookElements.forEach((bookElement) => {
        const bookTitle = bookElement.lastChild.firstChild.textContent.toLowerCase();
        if (bookTitle.includes(keyword.toLowerCase())) {
            bookElement.classList.remove("hide");
            isMatchFound = true;
        }
        else {
            bookElement.classList.add("hide");
        }
    });
    let noMatchMessage = document.querySelector(".no-match-message");
    if (!isMatchFound) {
        if (!noMatchMessage) {
            noMatchMessage = document.createElement("p");
            noMatchMessage.classList.add("no-match-message");
            noMatchMessage.textContent = "Inget resultat hittades";
            let header = document.getElementById("header");
            header.appendChild(noMatchMessage);
        }
    }
    else if (noMatchMessage) {
        noMatchMessage.remove();
    }
};
const createBookInfo = (clickedBook) => {
    let overlay = addOverlay();
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
};
function addOverlay() {
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
    return overlay;
}
const loadBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = yield getBookData();
    createBookElement(bookData);
});
export { loadBooks };
