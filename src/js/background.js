import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCLMdDi3V0UuReHYUqR_kRe9NpSBrzbf4g",
    authDomain: "gace-id.firebaseapp.com",
    projectId: "gace-id",
    storageBucket: "gace-id.appspot.com",
    messagingSenderId: "814051818099",
    appId: "1:814051818099:web:951ad46d171c8c519ec806"
};

initializeApp(firebaseConfig);

const auth = getAuth()

function initApp() {
    auth.onAuthStateChanged(function (user) {
        console.log('User state change detected from the Background script of the Chrome Extension:', user);
    });
}

chrome.browserAction.onClicked.addListener(function () {
    initApp();
});
