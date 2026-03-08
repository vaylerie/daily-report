import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: "user" | "admin" | "pro"
) {

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role,
    createdAt: new Date()
  });

  return user;
}

export async function loginUser(email: string, password: string) {

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  const docRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(docRef);

  const userData = userDoc.data();

  return {
    uid: user.uid,
    email: user.email,
    role: userData?.role
  };
}
