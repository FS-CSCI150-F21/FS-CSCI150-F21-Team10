import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'



var db = getFirestore(app);

document.getElementById('getBtn').addEventListener('click', (e) => {
    e.preventDefault();
    getColl(db);
})


async function getColl(db) {
    const querySnapshot = await getDocs(collection(db, 'Household_database'));
        querySnapshot.forEach((doc) => {
           // console.log(`${doc.id} => ${doc.data()}`);
           house.innerHTML = (`${doc.id} => ${doc.data()}`)
           let data = doc.data();
           house.innerHTML = data.hName;
           
        });

}









