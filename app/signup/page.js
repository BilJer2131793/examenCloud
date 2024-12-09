'use client'
import init from '../common/init'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'; 
import Link from "next/link"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {collection, addDoc, getFirestore} from "firebase/firestore"

export default function() {
  const [auth, messaging] = init();
  const router = useRouter();

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
  function submitForm(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user;
        console.log(user);

      })
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.log(error.message);
      });

      console.log("User creer")
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
    <h2 className="text-center mb-4">Inscription</h2>
    <form onSubmit={submitForm}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Adresse Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Mot de passe
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          S'inscrire
        </button>
      </div>
    </form>
    <div className="text-center mt-3">
      <Link href="/login">
        <p className="btn btn-link">Déjà un compte ? Se connecter</p>
      </Link>
    </div>
  </div>
</div>
  )
}
