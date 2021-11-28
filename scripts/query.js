import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'

var db = getFirestore(app);

async function query(searchID) {
	const hNameID = db.child('hNameID');
	const query = hNameID.orderByChild('hNameID').equalTo(searchID).limitToFirst(1);
	query.on('value', snap => {
	});
}
//test push