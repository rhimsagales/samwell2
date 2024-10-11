import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7fHXucYBGT8hIR10GtyQP58jPML1vnng",
    authDomain: "sammuel-17249.firebaseapp.com",
    databaseURL: "https://sammuel-17249-default-rtdb.firebaseio.com",
    projectId: "sammuel-17249",
    storageBucket: "sammuel-17249.appspot.com",
    messagingSenderId: "827538260486",
    appId: "1:827538260486:web:e30109f052384502b6b987",
    measurementId: "G-V4ZKJ8CY34"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function retrieveAllOrders() {
    // Reference to the root of the database
    const dbRef = ref(db); 

    // Use child() to get the "orders" path
    get(child(dbRef, 'orders')).then((snapshot) => {
    if(snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
            const orderData = childSnapshot.val();
            console.log("Order Data:", orderData);
        });
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
        console.error("Error retrieving data:", error);
    });
} 

document.getElementById('downloadBtn').addEventListener('click', (event) => {
    event.preventDefault();
    retrieveAllOrders();
});
