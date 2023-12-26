var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getBookData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books");
            const bookData = yield response.json();
            return bookData;
        }
        catch (error) {
            console.log("Error", error);
            return [];
        }
    });
}
function handleBookData() {
    return __awaiter(this, void 0, void 0, function* () {
        const bookData = yield getBookData();
        console.log(bookData);
        bookData.forEach((element) => {
            console.log(element);
        });
    });
}
handleBookData();
export {};
