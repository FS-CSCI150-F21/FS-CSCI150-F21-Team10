import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, doc, setDoc, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'

const firebaseApp = initializeApp(
    {
        apiKey: "AIzaSyAxzPTkWTsGWOt8pXzyEZE9s0TG2zXLbg4",
        authDomain: "rumii-44bc9.firebaseapp.com",
        projectId: "rumii-44bc9",
        storageBucket: "rumii-44bc9.appspot.com",
        messagingSenderId: "464827417599",
        appId: "1:464827417599:web:cd89342122f5b9aa759dca",
        measurementId: "G-ZW8DSCG9PM"
    }
);

const db = getFirestore(firebaseApp);
document.getElementById('setBtn').addEventListener('click', setColl(db));
document.getElementById('getBtn').addEventListener('click', getColl(db));

async function setColl(db) {
    var rumiisNo = document.getElementById('rumiisID').value;
    var rent = document.getElementById('rentID').value;
    const docRef = await addDoc(collection(db, "Household_database"), {
        rumiis: rumiisNo,
        rent: rent
    });
    console.log("Document written with ID: ", docRef.id);
}

async function getColl(db) {
    const querySnapshot = await getDocs(collection(db, 'Household_database'));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}





