// src/firebase/experiencesService.js
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";

const experiencesRef = collection(db, "experiences");

export const fetchExperiences = async () => {
  // Sort by order (ascending) then by createdAt (descending)
  const q = query(
    experiencesRef,
    orderBy("order", "asc"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addExperience = async (experience) => {
  const experienceData = {
    period: experience.period,
    role: experience.role,
    company: experience.company,
    description: experience.description,
    order: experience.order, // Add order field
    createdAt: Timestamp.now(),
  };
  const docRef = await addDoc(experiencesRef, experienceData);
  return { id: docRef.id, ...experienceData };
};

export const updateExperience = async (updatedExperience) => {
  const experienceData = {
    period: updatedExperience.period,
    role: updatedExperience.role,
    company: updatedExperience.company,
    description: updatedExperience.description,
    order: updatedExperience.order, // Add order field
    updatedAt: Timestamp.now(),
  };
  const experienceRef = doc(db, "experiences", updatedExperience.id);
  await updateDoc(experienceRef, experienceData);
};

export const deleteExperience = async (id) => {
  await deleteDoc(doc(db, "experiences", id));
};
