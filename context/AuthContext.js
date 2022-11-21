import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';
import { auth } from '../config/firebaseconfig';

const UserContext = createContext();

const storeCustomerId = async (userUid, username, email, domisili) => {
  await setDoc(doc(db, 'user', userUid), {
    id: userUid,
    username: username,
    email: email,
    domisili: domisili,
    jeniskelamin: "",
    usia: "",
  });
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signUp = (username, email, domisili, password) => {
    createUserWithEmailAndPassword(auth, email, password).then(
      (registeredUser) =>
        storeCustomerId(registeredUser.user.uid, username, email, domisili)
    );
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(`ini user ${JSON.stringify(currentUser)}`)
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ signUp, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
