console.log("femiiiii")
console.log("errd")
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy,
  serverTimestamp,
  getDoc, updateDoc
} from 'firebase/firestore'

import {
  getAuth, createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword
} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB2zx1CNbUG3Z1lWC-GBr6nF0cNHxHJxpw",
    authDomain: "fir-tutorial-01-3fb2e.firebaseapp.com",
    projectId: "fir-tutorial-01-3fb2e",
    storageBucket: "fir-tutorial-01-3fb2e.appspot.com",
    messagingSenderId: "814945980971",
    appId: "1:814945980971:web:619c54679bfae653f7906e"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()
// collection ref
const colRef = collection(db, 'books')

// query

const q = query(colRef, orderBy('createdAt', 'asc'))

// realtime collection data
onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt : serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

// geta single document

const docRef = doc(db, 'books', 'SYZapYeKCradITksKtO5')


// getDoc(docRef)
//   .then((doc)=>{
//     console.log(doc.data(), doc.id)
//   })

console.log("{bola")
onSnapshot(docRef, (doc)=>{
  console.log(doc.data(), doc.id)
})

//updating a document

const updateForm = document.querySelector(".update")

updateForm.addEventListener("submit", (e)=>{
  e.preventDefault()

  const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: "updated title"
  })
    .then(()=>{
      updateForm.reset()
    })
})


//AUTH

// signing up users

const signUpForm = document.querySelector(".signup")

signUpForm.addEventListener("submit", (e)=>{
  e.preventDefault()

const email = signUpForm.email.value;
const password = signUpForm.password.value

createUserWithEmailAndPassword(auth, email, password)
  .then((credential)=>{
    console.log("user created: ",credential.user)
    signUpForm.reset()
  })
    .catch((error)=>{
      console.log("this is",error.message)
    })
})

//logging in and out

const logout = document.querySelector(".logout")

logout.addEventListener("click", function(){
  signOut(auth)
    .then(()=>{
      console.log("the user signed out")
    })
    .catch((error)=>{
      console.log(error.message)
    })
})


const loginForm = document.querySelector(".login")

loginForm.addEventListener("submit", (e)=>{
  e.preventDefault()

  const email = loginForm.email.value;
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then((cred)=>{
      console.log("the user signed in: ", cred.user )
    })
    .catch((err)=>{
      console.log(err.message)
    })

})

