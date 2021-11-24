import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import app from './initApp.js'

var db = getFirestore(app);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    //display google photo in userPhoto classes
    var userPhoto = document.getElementsByClassName("userPhoto");
    for(var i=0;i<userPhoto.length;i++)
    userPhoto[i].innerHTML = `<center><img src="${user.photoURL}" style="width:100%;height:auto"></center>`;

  } else {
    //if not signed in, redirect back to signin page
    window.location = 'index.html'; 
  }
});




