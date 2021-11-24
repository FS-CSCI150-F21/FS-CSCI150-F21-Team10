import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import app from './initApp.js'

var db = getFirestore(app);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // will probably need userID later
    const uid = user.uid;

    //display google user name and photos
    document.getElementById('username').innerHTML = `
    <p style="text-align:center"> ${user.displayName} </p>
    `
    var userPhoto = document.getElementsByClassName("userPhoto");
    for(var i=0;i<userPhoto.length;i++)
    userPhoto[i].innerHTML = `<center><img src="${user.photoURL}" style="width:50%"></center>`;

  } else {
    window.location = 'index.html'; 
  }
});




