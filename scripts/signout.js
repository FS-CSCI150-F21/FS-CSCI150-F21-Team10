import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

const auth = getAuth();

document.getElementById('signoutBtn').addEventListener('click', LogoutUser)

function LogoutUser() {
  console.log('Logout Btn Call')
  signOut(auth).then(() => {
    window.location = 'index.html';
  }).catch((error) => {
    console.log(e)
  });
}


