import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
signOut, updateEmail, updatePassword } from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  console.log("IN AUTH PROVIDER")
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    console.log("In the sign-up route!!!", email, password)
    //Create User with Email and Password
   try {
     console.log("IN THE TRY!!!")
    return createUserWithEmailAndPassword(auth, email, password)

   } catch (error) {
    // Handle Errors here.
    console.log("IN THE ERROR!!!", error)
  };
  }

  function login(email, password) {
    console.log("IN THE LOGIN!!")
    try {
        console.log("IN THE TRY!!!")
      return signInWithEmailAndPassword(auth, email, password)
    }
    catch (error) {
      console.log("IN THE CATCH!!!", error)
    }
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateUserEmail(email) {
    return updateEmail(auth, email)
  }

  function updatePassword(password) {
    return updatePassword(auth, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}