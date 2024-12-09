'use client'
import init from '../common/init'
import { getDownloadURL, getStorage, listAll, uploadBytes } from "firebase/storage";
import { ref } from 'firebase/storage';
import { collection, addDoc, getFirestore, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
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

const [auth, messaging] = init();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function func() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          if (!currentUser) {
            router.push("/login");
          }
        });
    
        return () => unsubscribe();
      }, [auth, router]);
    
      if (user === null) {
        return null;
      }



    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const docRef = await addDoc(collection(db, "Film"), {
          name,
          description: desc,
          image,
          userId : auth.currentUser?.uid
        });
        console.log("Document ajouté avec ID :", docRef.id);
        setName("");
        setDesc("");
        setImage("");
      } catch (error) {
        console.error("Erreur lors de la création de la page :", error);
      }
    };
    if (!user) {
        router.push('/login');
        return null;
      }
    return (
      <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
        <h2>Créer une page</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
            ></textarea>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Créer
          </button>
        </form>
      </div>
    );
  }