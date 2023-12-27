console.log("femiiiii")
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy,
  serverTimestamp,
  getDoc
} from 'firebase/firestore'

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