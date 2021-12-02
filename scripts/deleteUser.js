import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, deleteField} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'
import app from './initApp.js'

var db = getFirestore(app);

const auth = getAuth();
document.getElementById('delButton').addEventListener('click', (e) => {
    const userID = auth.currentUser.uid;
    deleteUser(userID)
});

async function deleteUser(userIDinput){
    const user = getAuth().currentUser;
    const userRef = doc(db, "User_database", userIDinput);
    const thisUserDoc = await getDoc(userRef);

    const houseRef = doc(db, "Household_database", thisUserDoc.data().houseID);
    const thisHouseDoc = await getDoc(houseRef);

    console.log(thisHouseDoc.data().rumiis)
    var rumiiArr = thisHouseDoc.data().rumiis
    for (let i = 0; i < rumiiArr.length; i++){
        if((thisUserDoc.data().userName) == (rumiiArr[i])){
            rumiiArr.splice(i, 1);
            
            setDoc(houseRef, {
                rumiis: rumiiArr
            },{merge: true});
            setDoc(userRef, {
            houseID: deleteField()
            },{merge: true});
        }
    }
}
