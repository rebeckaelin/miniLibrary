// INTERFACES
import {Book} from "./interfaces.js";

// VARIABEL FÖR MIN OVERLAY
let overlay: HTMLDivElement;

// fetch av data
async function getBookData(): Promise<void> {
  try {
    const response: Response = await fetch(
      "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"
    );
    let bookData: Book[] = await response.json();
    createBookElement(bookData);
    searchBook(bookData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    } else {
      console.log("Unknown error", error);
    }
  }
}
getBookData();

function createBookElement(bookArray: Book[]) {
  bookArray.forEach((book) => {
    const bookCollection = document.querySelector(".book-collection");

    let bookElement: HTMLDivElement = document.createElement("div");
    bookElement.className = "book";
    let coverTitle: HTMLElement = document.createElement("h3");
    coverTitle.textContent = book.title;

    bookCollection.append(bookElement);
    bookCollection.append(coverTitle);
    addClickEvent(bookElement, book);
  });
}

function addClickEvent(bookElement: HTMLDivElement, book: Book) {
  bookElement.addEventListener("click", () => {
    createBookInfo(book);
  });
}

//   ******************** FUNKTIONER *************************

function searchBook(bookData: Book[]): void {
  const searchForm = document.getElementById("search-form") as HTMLFormElement;

  searchForm.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    const searchField = document.getElementById("search") as HTMLInputElement;
    let searchValue: string = searchField.value.toLowerCase();

    let foundBooks: Book[] = bookData.filter((book: Book) =>
      book.title.toLowerCase().includes(searchValue)
    );
    if (foundBooks.length >= 2) {
      // searchResult(foundBooks);
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
    } else {
      console.log("Ingen bok hittades med den söksträngen");
    }

    searchField.value = "";
  });
}

// function searchResult(foundBooks: Book[]) {
//   foundBooks.forEach((book) => {
//     let result = document.createElement("div");
//     result.className = "search-result";
//     result.append(book.title);
//     console.log("sökresultat");
//   });
// }

// function searchBook(bookData: Book[]): void {
//   const searchForm = document.getElementById("search-form") as HTMLFormElement;
//   searchForm.addEventListener("submit", (event: SubmitEvent) => {
//     event.preventDefault();
//     const searchField = document.getElementById("search") as HTMLInputElement;
//     let searchValue: string = searchField.value.toLowerCase();
//     // console.log(searchValue);

//     if (searchValue.length < 3) {
//       return;
//     }

//     let clickedBook: Book | undefined = bookData.find((book: Book) =>
//       book.title.toLowerCase().includes(searchValue)
//     );

//     if (clickedBook) {
//       createBookInfo(clickedBook);
//     } else {
//       console.log("Ingen bok hittades med den söksträngen");
//     }
//     searchField.value = "";
//   });
// }

function createBookInfo(clickedBook: Book): void {
  overlay = addOverlay();

  let infoPage: HTMLElement = document.createElement("article");
  let details: HTMLElement = document.createElement("section");
  let closeButton: HTMLButtonElement = document.createElement("button");
  let title: HTMLElement = document.createElement("h1");
  let author: HTMLElement = document.createElement("h4");
  let plot: HTMLParagraphElement = document.createElement("p");
  let audience: HTMLParagraphElement = document.createElement("p");
  let published: HTMLParagraphElement = document.createElement("p");
  let numOfPages: HTMLParagraphElement = document.createElement("p");
  let publisher: HTMLParagraphElement = document.createElement("p");

  title.textContent = `${clickedBook.title}`;
  author.textContent = `Author: ${clickedBook.author}`;
  plot.textContent = `${clickedBook.plot}`;
  audience.textContent = `Audience: ${clickedBook.audience}`;

  if (clickedBook.year) {
    published.textContent = `Published: ${clickedBook.year}`.toString();
  } else {
    published.textContent = " Published: N/A";
  }

  if (clickedBook.pages) {
    numOfPages.textContent = `Pages: ${clickedBook.pages}`.toString();
  } else {
    numOfPages.textContent = "Pages: N/A";
  }
  publisher.textContent = `Publisher: ${clickedBook.publisher}`;

  closeButton.textContent = "←";
  closeButton.addEventListener("click", (): void => {
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

function addOverlay(): HTMLDivElement {
  overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);
  return overlay;
}
