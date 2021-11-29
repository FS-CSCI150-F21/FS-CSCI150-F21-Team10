
import { getFirestore, collection, getDocs,query, where, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'

var db = getFirestore(app);

document.getElementById('getHouse').addEventListener('click', (e) => {
    e.preventDefault();
    getColl(db);
})

async function getColl(db) {
const q = query(collection(db, "Household_database"), where("hName", "==", "malee's place"));
const querySnapshot = await getDocs(q);
    const Arr = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        Arr.push(doc.data().hName);
    });
};






