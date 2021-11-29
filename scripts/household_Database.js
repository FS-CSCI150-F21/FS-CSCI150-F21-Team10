import { getFirestore, collection, doc, setDoc, getDoc, addDoc} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'
import app from './initApp.js'

var db = getFirestore(app);

const varDoc = collection(db, "Household_database");
const varDoc2 = collection(db, "User_database");

var billNames = [];
var billAmounts = [];
billAmounts.length = 6;
billNames.length = 6;
var b = 0;
var c = 0;

//Questionare calling the setter functions

document.getElementById('Qsub').addEventListener('click', (e) => {
    e.preventDefault();

    var inHname = document.getElementById('houseName').value;
    var inHsize = parseInt(document.getElementById('numInHouse').value);
    var inApt = parseInt(document.getElementById('house').value);
    var inNoRoom = parseInt(document.getElementById('numBedrooms').value);
    var inUserName = document.getElementById('usernameInput').value;
    //var inHouse = document.getElementById('apt').value;

    
   
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
            billAmounts[c] = tempAmt[a];
            c++;
        }
    }
      
    newHouse(inHname, inHsize, inApt, inNoRoom, inUserName); 

})

//creates a new document in household_database
async function newHouse(hNameIn,hSizeIn,hTypeIn,noRoomIn,rumiiIN){
    var billAvg = 100/hSizeIn;
    const user = getAuth().currentUser;
    const newHouseDoc = await addDoc(varDoc, {
        hName: hNameIn,
        hSize: hSizeIn,
        hType: hTypeIn,
        noRoom: noRoomIn,
        rumiis: [rumiiIN],
    })

    .then(function(docRef) {
        //makes "Bills" sub-collection
        makeBills(billAmounts, billAvg, billNames, docRef.id);
        // adds the houseID into the house doc itself, in case we need it
        setDoc(doc(varDoc, docRef.id), {
            houseID: docRef.id
        },
        {merge: true});

        const newUserDoc = setDoc(doc(varDoc2, user.uid), {
            houseID: docRef.id
        },
        {merge: true});
    })
    .catch(function(error){
        console.error("error: ", error);
    });
}

async function makeBills(bamt, bavg, bname, hid){

     for(let i = 0; i < bname.length; i++ ){
         if(bname[i]!=null){
          await setDoc(doc(db, "Household_database", hid, "Bills", bname[i]), {
             amount : parseInt(bamt[i]),
             billPer : bavg
             // due : dueDateArr[i]
          });
        }
         }
          //insert for loop when custom billPer  is implemented
 }

/////////////////////////////////////////////////////////////////////////////
async function set_hname(dbInput, docInput, fieldInput){
    await setDoc(doc(dbInput, docInput), { 
    hName : fieldInput
    },
    {merge: true});
}

async function set_hsize(dbInput1, docInput1, fieldInput1){
    await setDoc(doc(dbInput1, docInput1), {
        hSize : fieldInput1
    },
    {merge: true});
}


async function set_noroom(dbInput2, docInput2, fieldInput2){
    await setDoc(doc(dbInput2, docInput2), {
        noRoom : fieldInput2
    },
    {merge: true});
}


async function set_htype(dbInput3, docInput3, boolApt, boolHouse){
    await setDoc(doc(dbInput3, docInput3), {
        hType : inApt
    },
    {merge: true});
}

/////////////////////////////////////////////////////////////////////////////
// async function get_hname(db){
//     const printThis = getDoc(doc(varDoc, "79fBCYsnORWzu528pPAX"));
//     console.log(printThis.data());
// }