import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, getDoc, setDoc, collection, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCLMdDi3V0UuReHYUqR_kRe9NpSBrzbf4g",
    authDomain: "gace-id.firebaseapp.com",
    projectId: "gace-id",
    storageBucket: "gace-id.appspot.com",
    messagingSenderId: "814051818099",
    appId: "1:814051818099:web:951ad46d171c8c519ec806"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

const auth = getAuth();
auth.languageCode = "ja";
const db = getFirestore(app);

const signin_button = document.getElementById('signin-button');
const signout_button = document.getElementById('signout-button');
const user_data_log = document.getElementById('user_data');

function SignIn() {
    startAuth();
    signin_button.style.display = "none";
    signout_button.style.display = "block";
}

function SiginOut() {
    if (auth.currentUser) {
        auth.signOut();
        signin_button.style.display = "block";
        signout_button.style.display = "none";
        user_data.textContent = ''
    }
}

function startAuth() {
    if (chrome.runtime.lastError) {
        console.error(JSON.stringify(chrome.runtime.lastError));
    } else {
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

/* auth.onAuthStateChanged(async function (user) {
    if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var photoURL = user.photoURL;
        var uid = user.uid;
        signin_button.style.display = "none";
        signout_button.style.display = "block";
        user_data_log.textContent = JSON.stringify(user);
        const user_data = await getDoc(doc(db, 'users', uid));
        if (!(user_data.exists())) {
            await setDoc(doc(collection(db, 'users'), uid), {
                name: displayName,
                mail: email,
                photo: photoURL,
                id: uid
            });
        }
    } else {
        signin_button.style.display = "block";
        signout_button.style.display = "none";
        user_data.textContent = '';
    }
}); */
signin_button.addEventListener('click', SignIn, false);
signout_button.addEventListener('click', SiginOut);
