import {Book} from "../types/interfaces";

async function getBookData(): Promise<Book[]> {
  try {
    const response: Response = await fetch(
      "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"
    );
    const bookData: Book[] = await response.json();

    return bookData;
  } catch (error) {
    console.log("Error", error);
    return [];
  }
}
// getBookData();

async function handleBookData() {
  const bookData: Book[] = await getBookData();
  console.log(bookData);
  bookData.forEach((element) => {
    console.log(element);
  });
}

handleBookData();
