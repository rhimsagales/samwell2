import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, set, child} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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

function saveOrderToFirebase(order) {
  // Use push() to generate a unique ID and add the order
  const ordersRef = ref(db, 'orders'); // Reference to the 'orders' collection
  const newOrderRef = push(ordersRef); // Create a new reference with a unique ID

  set(newOrderRef, order)
    .then(() => {
      console.log("Order saved successfully");
      document.getElementById('successMessage').style.display = 'block';
    })
    .catch((error) => {
      console.error("Error saving order: ", error);
    });
}
function checkEmpty(value) {
  return value.trim() === '' ? 'none' : value;
}

function collectOrderData() {
  const orderData = {
    user: {
      username: document.getElementById('username').value,
      gmail: document.getElementById('gmail').value,
      cellphone: document.getElementById('cellphone').value,
      studentNumber: document.getElementById('studentNumber').value,
      campus: document.getElementById('campus').value
    },
    NSTP: {
      qty: document.getElementById('NSTPQty').value,
      size: document.getElementById('NSTPSize').value
    },
    UniformPE: {
      qty: document.getElementById('UNIFORMPEQty').value,
      size: document.getElementById('UNIFORMPESize').value
    },
    Joggerpants: {
      qty: document.getElementById('JoggerpantsQty').value,
      size: document.getElementById('JoggerpantsSize').value
    }
  };

  return orderData;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submitOrder').addEventListener('click', () => {
    const orderData = collectOrderData();
    saveOrderToFirebase(orderData);
  });
  
});