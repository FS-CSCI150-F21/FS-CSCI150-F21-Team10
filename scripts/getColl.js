import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'

document.getElementById('getBtn').addEventListener('click', getColl(app));

var db = getFirestore(app);
async function getColl(app) {
    const querySnapshot = await getDocs(collection(db, 'tdb'));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}



