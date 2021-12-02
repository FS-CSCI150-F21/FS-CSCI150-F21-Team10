import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, deleteField} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'
import app from './initApp.js'

var db = getFirestore(app);

const auth = getAuth();
document.getElementById('delButton').addEventListener('click', (e) => {
    e.preventDefault();
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

// async function deleteUser(inputHID){
//     const user = getAuth().currentUser;
//     const houseSnap = await getDoc(doc(db,"Household_database",inputHID));
//     var rumiiArr = houseSnap.data().rumiis
//     var printToConsole = "error didnt go through the loop"
//     for (let i = 0; i < rumiiArr.length; i++){
//         if((currentDoc.data().userName) == rumiiArr[i]){
//             rumiiArr.splice(i, 1);
//             printToConsole = "sucessfully deleted"
//         } else {
//         }
//     }
//     setDoc(doc(db, "Household_database", inputHID), {
//         rumiis: rumiiArr
//     },
//     {merge: true});
            
//     setDoc(doc(db, "User_database", user), {
//         houseID: deleteField()
//     },
//     {merge: true});
//     return printToConsole;
// }