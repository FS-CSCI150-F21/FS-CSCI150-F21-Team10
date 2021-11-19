import { getFirestore, collection, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'

var db = getFirestore(app);

const varDoc = collection(db, "Household_database");

document.getElementById('houseNameJoin').addEventListener('click', (e) => {
    e.preventDefault();
    setColl(db);
})

async function set_hname(db){
    await setDoc(doc(varDoc, "79fBCYsnORWzu528pPAX")), {
        hName : document.getElementById('houseName').value
    };
}


function set_hsize(db){
    await setDoc(doc(varDoc, "79fBCYsnORWzu528pPAX")), {
        hSize : parseInt(document.getElementById('numInHouse').value)
    };
}


function set_noroom(db){
    await setDoc(doc(varDoc, "79fBCYsnORWzu528pPAX")), {
        noRoom : parseInt(document.getElementById('numBedrooms').value)
    };
}


function set_htype(db){
    await setDoc(doc(varDoc, "79fBCYsnORWzu528pPAX")), {
        hType : document.getElementById('houseOrApt').value
    };
}

///////////////////////////////////////////////////////////////////////////////
async function get_hname(db){
    const printThis = getDoc(doc(varDoc, "79fBCYsnORWzu528pPAX"));
    console.log(printThis.data());
}