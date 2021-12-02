import { getFirestore, collection, doc, setDoc, getDoc, getDocs, addDoc, query, where} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'
import app from './initApp.js'

var db = getFirestore(app);

const varDoc = collection(db, "Household_database");  //path to household database
const varDoc2 = collection(db, "User_database");  //path to user database

var billNames = []; // empty array for bill names
var billAmounts = []; // empty array for bill ammounts
billAmounts.length = 6; // make this empty array length of 6
billNames.length = 6; // make this empty array length of 6
var b = 0; // iterative variables
var c = 0; //    ^  ^  ^  ^

//Create Household event listener
document.getElementById('Qsub').addEventListener('click', (e) => {
    e.preventDefault();

    var inHname = document.getElementById('houseName').value;   //house name
    var inHsize = parseInt(document.getElementById('numInHouse').value);  //house size
    var inNoRoom = parseInt(document.getElementById('numBedrooms').value);  //number of rooms
    var inUserName = document.getElementById('usernameInput').value;  //user name
    var inHouse = document.getElementById('house');  // house type
    var houseBool = 1;
    if (inHouse.checked == true){
        houseBool = 1;
    } else{
        houseBool = 0;
    }

    var tempCheck = [ //temporary array to save all the bill names
                    document.getElementById('rentBill'), document.getElementById('electricBill'), document.getElementById('gasBill'),
                    document.getElementById('waterBill'), document.getElementById('garbageBill'), document.getElementById('internetBill')
                    ];
    var tempAmt = [ //temporary array to save all the bill amounts
                    document.getElementById('rentAmount').value, document.getElementById('electAmount').value, document.getElementById('gasAmount').value,
                    document.getElementById('waterAmount').value, document.getElementById('garbAmount').value, document.getElementById('intAmount').value
                    ];

    for(let a = 0; a < 6; a++){  //for loop in order to cut all the names that are not checked to push them and their corresponding values to the front of their array
        if (tempCheck[a].checked == true){
            billNames[b] = tempCheck[a].value;
            b++;
        }
        if (tempAmt[a] != ""){
            billAmounts[c] = tempAmt[a];
            c++;
        }
    }
    
    newHouse(inHname, inHsize, houseBool, inNoRoom, inUserName); //function to make a new house
})

//join household event listener
document.getElementById('Qsub2').addEventListener('click', (e) => {
    e.preventDefault();
    var houseJoinIn = document.getElementById('houseNameJoin').value;
    var addRumii = document.getElementById('usernameInput').value;
    findHouse(houseJoinIn, addRumii);
})

//finds the house name and adds the user to the house
async function findHouse(searchID, newRumii) {
    const user = getAuth().currentUser;  //gets current user saved to a variable
	const q = query(varDoc, where("hName", "==", searchID));  //querey to find the house ID entered
    const qSnapshot = await getDocs(q);
    if(!(qSnapshot.empty)){
        qSnapshot.forEach((currentDoc) => {
            var rumiiArray = currentDoc.data().rumiis;
            rumiiArray.push(newRumii)
            //sends new array to householdDB
            setDoc(doc(varDoc, currentDoc.id), {
                rumiis: rumiiArray
            },
            {merge: true});
            //sends houseID to userDB to link them together
            setDoc(doc(varDoc2, user.uid), {
                houseID: currentDoc.data().houseID
            },
            {merge: true});
        });
        console.log("send to page")
        window.location = 'homepage.html';
    }
    else{
        document.getElementById('searchResult').innerHTML = "Could not find house"
        console.log("Could not find house");
    }
}

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
        //adds the houseID to the Userdatabase to connect the two
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
        var amm = parseInt(bamt[i]); //parse the amount form string to int
        if(bname[i]!=null){
            await setDoc(doc(db, "Household_database", hid, "Bills", bname[i]), {  //create the bill subcollection and the individual bills in the household 
                amount : amm,
                billPer : bavg
                // due : dueDateArr[i]
            }
          );
        }
         }
          //insert for loop when custom billPer  is implemented
 }

/////////////////////////////////////////////////////////
//////// Setter functions////////////////////////////////
/////////////////////////////////////////////////////////
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
    //apt = 0, house = 1
    await setDoc(doc(dbInput2, docInput2), {
        noRoom : fieldInput2
    },
    {merge: true});
}

async function set_htype(dbInput3, docInput3, boolHouse){
    await setDoc(doc(dbInput3, docInput3), {
        hType : boolHouse
    },
    {merge: true});
}

/////////////////////////////////////////////////////////////////////
//////// Getter function(s ?)////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
export async function get_billDue(inputDB, inputHID, inputBillType){
    //InputDB = db //inputHID = householdID //inputBillType = rent,gas,water, etc. 
    const currentBill = await getDoc(doc(inputDB, "Household_database", inputHID, "Bills", inputBillType));
    var billPercent = currentBill.data().billPer / 100;
    return (billPercent * currentBill.data().amount)
}

// example of how to call this function, result is equal to how much it costs for that bill
// let token = get_billDue(db, "mTA7ApaDvrj7sSHF60uT", "Electric");
//     console.log(token)
//     token.then(function(result) {
//         console.log(result);
//     });