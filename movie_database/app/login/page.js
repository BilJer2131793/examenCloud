'use client';
import init from '../common/init';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import Link from "next/link"


export default function SignInForm() {
  const [auth, messaging] = init();
  const router = useRouter();
  
  function submitForm(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("test");
      })
      .then(() => {
        router.push('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });


  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
    <h2 className="text-center mb-4">Connexion</h2>
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
          Se connecter
        </button>
      </div>
    </form>
    <div className="text-center mt-3">
      <Link href="/signup">
        <p className="btn btn-link">Créer un compte</p>
      </Link>
    </div>
  </div>
</div>
  )
}