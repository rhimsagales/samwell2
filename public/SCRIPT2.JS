import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBS4L5dR4gumh6a9v8lx9DojAedQ3CoCk8",
    authDomain: "samwell05-34045.firebaseapp.com",
    projectId: "samwell05-34045",
    storageBucket: "samwell05-34045.appspot.com",
    messagingSenderId: "689664296992",
    appId: "1:689664296992:web:5232f5e235f2bd20b71445"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function saveOrderToFirebase(order) {
  const orderId = Math.random().toString(36).substr(2, 9);
  set(ref(db, 'orders/' + orderId), order);
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

function convertToCSV(data) {
  const headers = ['Type', 'Quantity', 'Size'];
  const rows = [];

  rows.push(['Username', data.user.username]);
  rows.push(['Gmail', data.user.gmail]);
  rows.push(['Cellphone', data.user.cellphone]);
  rows.push(['Student Number', data.user.studentNumber]);
  rows.push(['Campus', data.user.campus]);

  Object.keys(data).forEach(UniformType => {
    if (UniformType !== 'user') {
      const UniformData = data[UniformType];
      rows.push([UniformType, UniformData.qty, UniformData.size]);
    }
  });

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += headers.join(',') + '\n';
  rows.forEach(row => {
    csvContent += row.join(',') + '\n';
  });

  return encodeURI(csvContent);
}

document.getElementById('submitOrder').addEventListener('click', () => {
  const orderData = collectOrderData();
  saveOrderToFirebase(orderData);

  document.getElementById('successMessage').style.display = 'block';
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const orderData = collectOrderData();
  const csvContent = convertToCSV(orderData);

  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', 'order_data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});