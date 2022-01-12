import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const saveLink = (newLink) => addDoc(collection(db, "tasks"), newLink);

export const updateLink = (id, updatedFields) =>
  updateDoc(doc(db, "tasks", id), updatedFields);

export const onGetLinks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));
