import { getFirestore, collection, getDocs, setDoc, doc, arrayUnion, updateDoc, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import app from './initApp.js'
//import {set_hname,set_hsize,set_noroom,set_htype} from Household_database.js
var db = getFirestore(app);







document.getElementById('Qsub').addEventListener('click', (e) => {
    e.preventDefault();
    
})
 

async function deleteBill(){
    
}

async function editBill(){

}

/*
async function getUserHID(uid){
    // Get user's houseID
    const docRef = doc(db, "User_database", uid);
    const userDocSnap = await getDoc(docRef);

    // User's houseID used to query houses
    const houseRef = doc(db, "Household_database", userDocSnap.data().houseID);
    const houseDocSnap = await getDoc(houseRef);
}
*/
 