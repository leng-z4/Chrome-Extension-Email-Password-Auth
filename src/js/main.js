import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, deleteUser } from 'firebase/auth';
import { error } from './error.js';

const firebaseConfig = {
    /* your config */
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

const delete_account = document.getElementById('delete-account');
delete_account.style.display = 'none';

signup_button.addEventListener('click', function () {
    if (signup_email.value.length && signup_password.value.length) {
        const email = signup_email.value;
        const password = signup_password.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                sendEmailVerification(userCredential.user).catch(e => {
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

delete_account.addEventListener('click', function () {
    const result = window.confirm('本当にアカウントを削除しますか？');
    if (result) {
        deleteUser(auth.currentUser).catch(e => {
            console.log(e);
        });
    }
})

auth.onAuthStateChanged(function (user) {
    if (user) {
        if (user.emailVerified) {
            user_email.textContent = user.email;
            user_id.textContent = user.uid;
            user_data.style.display = 'block';
            signup_section.style.display = 'none';
            logout.style.display = 'block';
            signup_error.textContent = '';
            delete_account.style.display = 'block';
        } else {
            no_email_verified.style.display = 'block';
            signup_section.style.display = 'none';
        }
    }
});