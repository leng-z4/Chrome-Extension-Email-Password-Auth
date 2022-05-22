import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { error } from './error.js';

const firebaseConfig = {
    apiKey: "AIzaSyCLMdDi3V0UuReHYUqR_kRe9NpSBrzbf4g",
    authDomain: "gace-id.firebaseapp.com",
    projectId: "gace-id",
    storageBucket: "gace-id.appspot.com",
    messagingSenderId: "814051818099",
    appId: "1:814051818099:web:951ad46d171c8c519ec806"
};
initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = "ja";


const login_section = document.getElementById('login-section');
const login_email = document.getElementById('login-email');
const login_password = document.getElementById('login-password');
const login_button = document.getElementById('login-button');
const login_error = document.getElementById('login-error')

const signup_section = document.getElementById('signup-section');
const signup_email = document.getElementById('signup-email');
const signup_password = document.getElementById('signup-password');
const signup_button = document.getElementById('signup-button');
const signup_error = document.getElementById('signup-error');

const user_data = document.getElementById('user-data');
const user_email = document.getElementById('user-email');
const user_id = document.getElementById('user-id');
user_data.style.display = 'none';

const logout = document.getElementById('logout');
logout.style.display = 'none';

login_button.addEventListener('click', function () {
    if (login_email.value.length && login_password.value.length) {
        const email = login_email.value;
        const password = login_password.value;
        signInWithEmailAndPassword(auth, email, password).catch(e => {
            const e_ja = error(e, 'signin');
            login_error.textContent = e_ja;
        });
    }
});

signup_button.addEventListener('click', function () {
    if (signup_email.value.length && signup_password.value.length) {
        const email = signup_email.value;
        const password = signup_password.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                sendEmailVerification(userCredential.user).then(() => {
                    console.log('send');
                })
            }).catch(e => {
                const e_ja = error(e, 'signup');
                signup_error.textContent = e_ja;
            });
    }
});

logout.addEventListener('click', function () {
    if (auth.currentUser) {
        auth.signOut();
        logout.style.display = 'none';
        login_section.style.display = 'block';
        signup_section.style.display = 'block';
        user_email.textContent = '';
        user_id.textContent = '';
    }
});

auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log(user);
        user_email.textContent = user.email;
        user_id.textContent = user.uid;
        user_data.style.display = 'block';
        login_section.style.display = 'none';
        signup_section.style.display = 'none';
        logout.style.display = 'block';
        login_error.textContent = '';
        signup_error.textContent = '';
    }
});