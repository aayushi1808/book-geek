import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseService";

export const getBookWithBookId = async (bookId) => {
  const bookRef = doc(db, "books", bookId);
  const bookSnap = await getDoc(bookRef);
  return bookSnap;
};

export const getBookWithGenre = async (genre) => {
  const bookRef = collection(db, "books");
  const bookQuery = query(
    bookRef,
    where("Bookshelves", "array-contains", genre)
  );
  const bookSnaps = await getDocs(bookQuery);
  var bookNum = Math.floor(Math.random() * bookSnaps.size);
  return bookSnaps.docs[bookNum].data();
};

export const getBookMovies = async () => {
  const bookRef = collection(db, "books");
  const bookQuery = query(
    bookRef,
    where("Bookshelves", "array-contains", "Movie Books")
  );
  const bookSnaps = await getDocs(bookQuery);
  return bookSnaps.docs.map((doc) => doc.data());
};

export const getBookswithBookIds = async (bookIds) => {
  bookIds = splitArray(bookIds, 10);
  var books = [];
  for (var i = 0; i < bookIds.length; i++) {
    var bookId = bookIds[i];
    const bookRef = collection(db, "books");
    const bookQuery = query(bookRef, where("BookId", "in", bookId));
    const bookSnaps = await getDocs(bookQuery);
    var temp = bookSnaps.docs.map((doc) => doc.data());
    console.log(temp);
    books = [...books, ...temp];
  }
  return books;
};

const splitArray = (array, size) => {
  var result = [];
  while (array.length) {
    result.push(array.splice(0, size));
  }
  return result;
};
