import { getFirestore, collection, getDocs, setDoc, doc, arrayUnion } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'
//import {set_hname,set_hsize,set_noroom,set_htype} from Household_database.js
var db = getFirestore(app);
const varDoc = collection(db, "Household_database");


//testing variables
document.getElementById('Qsub').addEventListener('click', (e) => {
    e.preventDefault();
    var rumiiNum = document.getElementById('numInHouse').value; 
    var billAvg = 100/rumiiNum;
  
    var billNames = [
                    document.getElementById('rentBill').value, document.getElementById('electricBill').value, document.getElementById('gasBill').value,
                    document.getElementById('waterBill').value, document.getElementById('garbageBill').value, document.getElementById('internetBill').value
                    ];
    var amountArr = [
                    document.getElementById('rentAmount').value, document.getElementById('electAmount').value, document.getElementById('gasAmount').value,
                    document.getElementById('waterAmount').value, document.getElementById('garbAmount').value, document.getElementById('intAmount').value
                    ];

    makeBills(amountArr, billAvg, billNames, rumiiNum);
    console.log(rumiiNum);
})

//var dueDateArr = [10];
//var percentArr = [billNames][rumiiNum];

async function makeBills(aarr, bavg, bname, rnum){
    for(let i = 0; i < bname.length; i++ ){
         await setDoc(doc(db, "Household_database", "SRweMhKV1RzvmVY5d75Z", "Bills", bname[i]), {
            name: bname[i],
            amount: parseInt(createForm.amount.aarr[i]),
            
            
            
            // due : dueDateArr[i]
         });

         for(let j = 0; j < rnum; j++){
            await setDoc(doc(db,"Household_database","SRweMhKV1RzvmVY5d75Z", "Bills", bname[i]), {
                billPer : arrayUnion(bavg),
          });

        }
         //insert for loop when custom billPer is implemented

    }
}

async function deleteBill(){
    
}
 /*
 for(let j = 0; j < rumiiNum; j++){
                  setDoc(doc(db,"Household_database","SRweMhKV1RzvmVY5d75Z", "Bills", "billNames[i]"), {
                    billPer : arrayUnion(percentArr[i][j])
                });

    }
*/