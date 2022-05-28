import {
  doc,
  getDoc,
  setDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDocs,
  orderBy,
  limit,
  query,
} from "firebase/firestore";
import { db } from "./firebaseService";

export const getUser = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  return userSnap;
};

export const createUser = async (userId, userData) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, userData);
};

export const updateUser = async (userId, userData) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, userData);
};

export const addBookRead = async (userId, bookId) => {
  const userRef = doc(db, `users/${userId}/booksRead`, "" + bookId);
  await setDoc(userRef, {
    BookId: bookId,
    DateRead: Date.now(),
  });
};

export const getHistory = async (userId, size) => {
  const userRef = collection(db, `users/${userId}/booksRead`);
  const userQuery = query(userRef, orderBy("DateRead", "desc"), limit(size));
  const userSnap = await getDocs(userQuery);
  return userSnap.docs.map((doc) => doc.data()["BookId"]);
};

export const addRemoveFavourite = async (userId, bookId) => {
  const favouriteRef = doc(db, `users/${userId}/favourite`, "" + bookId);
  const favouriteSnap = await getDoc(favouriteRef);
  if (favouriteSnap.exists()) {
    await deleteDoc(favouriteRef);
    return false;
  } else {
    await setDoc(favouriteRef, {
      BookId: bookId,
      DateRead: Date.now(),
    });
    return true;
  }
};

export const getFavourite = async (userId) => {
  const userRef = collection(db, `users/${userId}/favourite`);
  const userQuery = query(userRef, orderBy("DateRead", "desc"), limit(20));
  const userSnap = await getDocs(userQuery);
  return userSnap.docs.map((doc) => doc.data()["BookId"]);
};
