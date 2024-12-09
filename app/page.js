'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { getDownloadURL, getStorage, listAll, uploadBytes } from "firebase/storage";
import { ref } from 'firebase/storage';
import { collection, addDoc, getFirestore, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useEffect, useState } from "react";
import MovieComponent from "./Component/MovieComponent.js"
import { useRouter } from 'next/navigation';

const firebaseConfig = {
  apiKey: "AIzaSyBOZsQmJ0AD6_EPcw8-9X0lZNx8v3aHiWM",
  authDomain: "examenweb-fefcd.firebaseapp.com",
  projectId: "examenweb-fefcd",
  storageBucket: "examenweb-fefcd.firebasestorage.app",
  messagingSenderId: "369796436198",
  appId: "1:369796436198:web:455a422a56283274de6b27",
  measurementId: "G-C41MD4ZH2S"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);


console.log("user: " + JSON.stringify(auth.currentUser, null, 2));

export default function PagePrincipale() {
  const router = useRouter();
  const [listFilm, setListFilm] = useState([])
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  async function getFilm() {
    if(listFilm.length == 0){
      const q = query(collection(db, "Film"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const newFilms = [];
      
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        newFilms.push(doc.data());
      });
    
      setListFilm([ ...newFilms]); 
      console.log(listFilm); 
    }

  }

  useEffect(() => {
    if (user) {
      getFilm()
    }
  }, [user]);


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">The Movie Database</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/AddMovie">➕Add Movie</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            {user === null ? (
              <a className="navbar-brand" href="/login">
              Log in
              </a>
            ) : (
              <a className="navbar-brand" href="/login">
                Log out
              </a>
              )}
          </div>
        </div>
    </nav>
    {user ? (
      listFilm.length !== 0 ? (
        <div className="row">
          {listFilm.map((film, index) => (
            <MovieComponent
              key={index}
              imageUrl={film.image}
              title={film.name}
              description={film.description}
            />
          ))}
        </div>
      ) : (
        <p>Ajouter un film pour voir vos films</p>
      )
      ) : (
        <p>Log in pour voir vos films</p>
    )}
    </>
  );
}
