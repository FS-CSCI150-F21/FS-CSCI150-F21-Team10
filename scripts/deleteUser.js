import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, deleteField} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth,} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'
import app from './initApp.js'

var db = getFirestore(app);

document.getElementById('someButtonEvanWillMake').addEventListener('click', (e) => {
    e.preventDefault();

    deleteUser();
});

async function deleteUser(){
    const user = getAuth().currentUser;
    const q = query(collection(db, "User_database"), where("userID", "==", user));
    const qSnapshot = await getDocs(q);
        qSnapshot.forEach((currentDoc) => {
            var pulledHouseID = currentDoc.data().houseID;
            const houseSnap = getDoc(doc(db,"Household_database",pulledHouseID));
            var rumiiArr = houseSnap.data().rumiis
            rumiiArr.pop();
            setDoc(doc(db, "Household_database", pulledHouseID), {
                rumiis: rumiiArr
            },
            {merge: true});
            setDoc(doc(db, "User_database", user), {
                houseID: deleteField()
            },
            {merge: true});


    });
    
}