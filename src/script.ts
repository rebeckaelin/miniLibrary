// IMPORT
import {getBookData, createBookElement} from "./functions.js";

const loadBooks = async (): Promise<void> => {
  const bookData = await getBookData();
  createBookElement(bookData);
};
loadBooks();
