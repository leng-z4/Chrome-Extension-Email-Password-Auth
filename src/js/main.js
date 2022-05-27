import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
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

const signup_section = document.getElementById('signup-section');
const signup_email = document.getElementById('signup-email');
const signup_password = document.getElementById('signup-password');
const signup_button = document.getElementById('signup-button');
const signup_error = document.getElementById('signup-error');

const user_data = document.getElementById('user-data');
const user_email = document.getElementById('user-email');
const user_id = document.getElementById('user-id');
user_data.style.display = 'none';

const no_email_verified = document.getElementById('no-email-verified');
const email_send = document.getElementById('email-send');
no_email_verified.style.display = 'none';

const email_verified = document.getElementById('email-verified');
email_verified.style.display = 'none';

const logout = document.getElementById('logout');
logout.style.display = 'none';

const actionCodeSetting = {
    url: 'chrome-extension://cajgpjhpanbnilchfoaofkecfnihnhad/done.html',
    handleCodeInApp: true
}

signup_button.addEventListener('click', function () {
    if (signup_email.value.length && signup_password.value.length) {
        const email = signup_email.value;
        const password = signup_password.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                sendEmailVerification(userCredential.user, actionCodeSetting).then(() => {
                    console.log(userCredential.user);
                }).catch(e => {
                    console.log(e);
                })
            }).catch(e => {
                const e_ja = error(e, 'signup');
                signup_error.textContent = e_ja;
            });
    }
});

email_send.addEventListener('click', function () {
    sendEmailVerification(auth.currentUser).then(() => {
        no_email_verified.style.display = 'none';
        email_verified.style.display = 'block';
    })
})

logout.addEventListener('click', function () {
    if (auth.currentUser) {
        auth.signOut();
        logout.style.display = 'none';
        signup_section.style.display = 'block';
        user_email.textContent = '';
        user_id.textContent = '';
    }
});

auth.onAuthStateChanged(function (user) {
    if (user) {
        if (user.emailVerified) {
            console.log(user);
            user_email.textContent = user.email;
            user_id.textContent = user.uid;
            user_data.style.display = 'block';
            signup_section.style.display = 'none';
            logout.style.display = 'block';
            signup_error.textContent = '';
        } else {
            console.log(user);
            signup_section.style.display = 'none';
        }
    }
});