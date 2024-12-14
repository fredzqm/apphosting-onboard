'use client'
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../lib/firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { setCookie } from "cookies-next"; 

export function UserComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [debug, setDebug] = useState<any | null>(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    setDebug(auth.settings);
    console.log(auth.settings);
    console.log("initial", auth.currentUser);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      console.log("changed", user);
      user?.getIdToken().then((idToken) => {
        // Send the 'idToken' to your backend
        console.error('ID token:', idToken);
        setCookie("X-Firebase-Auth-Token", idToken);
      }).catch((error) => {
        console.error('Error getting ID token:', error);
      });
    });
    return () => unsubscribe();
  }, [auth]);

  async function handleSignIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {JSON.stringify(debug)}
          {user && (
            <div>
              My Profile
            </div>
          )}
          {user ? (
            <>
              <span className="text-gray-200 mr-4">Hello, {user.displayName}</span>
              <button onClick={handleSignOut} className="text-gray-200 hover:text-white">
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={handleSignIn} className="text-gray-200 hover:text-white">
              Sign In with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

