import {Book} from "./interfaces";
// fetch av data
const getBookData = async (): Promise<Book[]> => {
  try {
    const response: Response = await fetch(
      "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"
    );
    let bookData: Book[] = await response.json();
    return bookData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    } else {
      console.log("Unknown error", error);
      return [];
    }
  }
};

const createBookElement = (bookArray: Book[]) => {
  const searchForm = document.getElementById("search") as HTMLInputElement;
  searchForm.addEventListener("keyup", () => {
    searchBook(searchForm.value);
  });
  bookArray.forEach((book) => {
    const bookCollection: HTMLDivElement =
      document.querySelector(".book-collection");
    const bookWrapper: HTMLDivElement = document.createElement("div");
    bookWrapper.className = "book-wrapper";

    const bookElement: HTMLDivElement = document.createElement("div");
    bookElement.className = "book";
    let coverTitle: HTMLElement = document.createElement("h3");
    coverTitle.textContent = book.title;

    bookWrapper.append(bookElement, coverTitle);
    bookCollection.append(bookWrapper);
    bookElement.addEventListener("click", () => {
      createBookInfo(book);
    });
  });
};

const searchBook = (keyword: string): void => {
  const bookElements: NodeListOf<HTMLElement> =
    document.querySelectorAll(".book-wrapper");

  let isMatchFound: boolean = false;

  bookElements.forEach((bookElement) => {
    const bookTitle: string =
      bookElement.lastChild.firstChild.textContent.toLowerCase();

    if (bookTitle.includes(keyword.toLowerCase())) {
      bookElement.classList.remove("hide");
      isMatchFound = true;
    } else {
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
  } else if (noMatchMessage) {
    noMatchMessage.remove();
  }
};

const createBookInfo = (clickedBook: Book): void => {
  let overlay: HTMLDivElement = addOverlay();

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
};

function addOverlay(): HTMLDivElement {
  let overlay: HTMLDivElement = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);
  return overlay;
}

export {getBookData, createBookElement};
