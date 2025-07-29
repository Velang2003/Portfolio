// Import Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ✅ Your Firebase Config
const firebaseConfig = {
            apiKey: "AIzaSyDVynOvu5Jp0N5w22SynIT02mldch8-KOI",
            authDomain: "dashboard-1f9dd.firebaseapp.com",
            projectId: "dashboard-1f9dd",
            storageBucket: "dashboard-1f9dd.firebasestorage.app",
            messagingSenderId: "296358865377",
            appId: "1:296358865377:web:d639bbdbc8c741676b4aa0",
            measurementId: "G-DGGDX3N2JP"
        };


// ✅ Initialize App
export const app = initializeApp(firebaseConfig);

// ✅ Export Services
export const db = getFirestore(app);
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("✅ User is logged in:", user.email);
    } else {
        console.log("❌ No user logged in");
    }
});


