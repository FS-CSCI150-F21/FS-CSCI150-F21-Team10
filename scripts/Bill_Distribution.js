import { getFirestore, collection, getDocs, setDoc, doc, arrayUnion, updateDoc, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import app from './initApp.js'
//import {set_hname,set_hsize,set_noroom,set_htype} from Household_database.js
var db = getFirestore(app);



var billNames = [];
var amountArr = [];
amountArr.length = 6;
billNames.length = 6;
var b = 0;
var c = 0;
//var dueDateArr = [10];
//var percentArr = [billNames][rumiiNum];



document.getElementById('Qsub').addEventListener('click', (e) => {
    e.preventDefault();

   /*
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            const currHouse =  getUserHID(uid);
        } else {
            window.location = 'index.html';
        }
    });

    const currUserBills = collection(db, "Household_database", currHouse, "Bills" );  
    

    const userHouseholdBills = collection(db, "Household_databse", "SRweMhKV1RzvmVY5d75Z", "Bills") 
    
    const userHousehold = doc(db, "Household_databse", "SRweMhKV1RzvmVY5d75Z")
*/
 

    var rumiiNum = document.getElementById('numInHouse').value; 
    var billAvg = 100/rumiiNum;
   
    var tempCheck = [
                    document.getElementById('rentBill'), document.getElementById('electricBill'), document.getElementById('gasBill'),
                    document.getElementById('waterBill'), document.getElementById('garbageBill'), document.getElementById('internetBill')
                    ];
    var tempAmt = [
                    document.getElementById('rentAmount').value, document.getElementById('electAmount').value, document.getElementById('gasAmount').value,
                    document.getElementById('waterAmount').value, document.getElementById('garbAmount').value, document.getElementById('intAmount').value
                    ];

    for(let a = 0; a < 6; a++){
        if (tempCheck[a].checked == true){
            billNames[b] = tempCheck[a].value;
            b++;
        }
        if (tempAmt[a] != ""){
            amountArr[c] = tempAmt[a];
            c++;
        }
    }
      
    //addDoc(collection(db, "Household_database", "BS93xRxr61jc1ZGMWaR9"), Bills);
    makeBills(amountArr, billAvg, billNames, rumiiNum);
})
 


async function makeBills(aarr, bavg, bname, rnum){
   //await addDoc(doc(db, "Household_database", "SRweMhKV1RzvmVY5d75Z"), Bills);

    for(let i = 0; i < bname.length; i++ ){
      
            await setDoc(doc(db, "Household_database", "FusB6aOJ8a98w7HEo5Gm", "Bills", bname[i]), {
                amount : parseInt(aarr[i]),
                billPer : bavg
                // due : dueDateArr[i]
             });
        }
         
        
         //insert for loop when custom billPer  is implemented
}

async function deleteBill(){
    
}

async function editBill(){

}

async function getUserHID(uid){
    // Get user's houseID
    const docRef = doc(db, "User_database", uid);
    const userDocSnap = await getDoc(docRef);

    // User's houseID used to query houses
    const houseRef = doc(db, "Household_database", userDocSnap.data().houseID);
    const houseDocSnap = await getDoc(houseRef);

    return houseDocSnap;
}

 