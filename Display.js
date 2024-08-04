/** OG
 * 
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsMXsLI7EnmMaQl5i3SNWjJRMRlZSMOU0",
    authDomain: "cninjas-8ab4e.firebaseapp.com",
    projectId: "cninjas-8ab4e",
    storageBucket: "cninjas-8ab4e.appspot.com",
    messagingSenderId: "383516081066",
    appId: "1:383516081066:web:a0ad2748eda603e013c9d3",
    measurementId: "G-E8GEV2YY4G"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "user1"));//
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        document.body.innerHTML += `<p>${doc.id}: ${JSON.stringify(doc.data())}</p>`;
    });
}
window.onload = fetchData;

*/

/** only name, points, team 
 * 
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsMXsLI7EnmMaQl5i3SNWjJRMRlZSMOU0",
    authDomain: "cninjas-8ab4e.firebaseapp.com",
    projectId: "cninjas-8ab4e",
    storageBucket: "cninjas-8ab4e.appspot.com",
    messagingSenderId: "383516081066",
    appId: "1:383516081066:web:a0ad2748eda603e013c9d3",
    measurementId: "G-E8GEV2YY4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchData() {
    try {
        const querySnapshot = await getDocs(collection(db, "user1"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const name = data.name || "N/A";
            const points = data.points || "N/A";
            const team = data.team || "N/A";
            console.log(`Name: ${name}, Points: ${points}, Team: ${team}`);
            document.body.innerHTML += `<p>Name: ${name}, Points: ${points}, Team: ${team}</p>`;
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
        document.body.innerHTML += `<p>Error fetching data: ${error.message}</p>`;
    }
}

window.onload = fetchData;
*/


/** Number order
 * 
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsMXsLI7EnmMaQl5i3SNWjJRMRlZSMOU0",
    authDomain: "cninjas-8ab4e.firebaseapp.com",
    projectId: "cninjas-8ab4e",
    storageBucket: "cninjas-8ab4e.appspot.com",
    messagingSenderId: "383516081066",
    appId: "1:383516081066:web:a0ad2748eda603e013c9d3",
    measurementId: "G-E8GEV2YY4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchData() {
    try {
        const querySnapshot = await getDocs(collection(db, "user1"));
        const dataArray = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const name = data.name || "N/A";
            const points = data.points || 0; // Default to 0 if points are not present
            const team = data.team || "N/A";
            dataArray.push({ name, points, team });
        });
        
        // Sort the array by points in descending order
        dataArray.sort((a, b) => b.points - a.points);
        
        // Display the sorted data
        dataArray.forEach(item => {
            console.log(`Name: ${item.name}, Points: ${item.points}, Team: ${item.team}`);
            document.body.innerHTML += `<p>Name: ${item.name}, Points: ${item.points}, Team: ${item.team}</p>`;
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
        document.body.innerHTML += `<p>Error fetching data: ${error.message}</p>`;
    }
}

window.onload = fetchData;
*/

/* Displays (name, points, team) in number order and top 10 

import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsMXsLI7EnmMaQl5i3SNWjJRMRlZSMOU0",
    authDomain: "cninjas-8ab4e.firebaseapp.com",
    projectId: "cninjas-8ab4e",
    storageBucket: "cninjas-8ab4e.appspot.com",
    messagingSenderId: "383516081066",
    appId: "1:383516081066:web:a0ad2748eda603e013c9d3",
    measurementId: "G-E8GEV2YY4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchData() {
    try {
        const querySnapshot = await getDocs(collection(db, "user1"));
        const dataArray = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const name = data.name || "N/A";
            const points = data.points || 0; // Default to 0 if points are not present
            const team = data.team || "N/A";
            dataArray.push({ name, points, team });
        });
        
        // Sort the array by points in descending order
        dataArray.sort((a, b) => b.points - a.points);
        
        // Get only the top 10 entries
        const top10 = dataArray.slice(0, 10);
        
        // Display the top 10 sorted data in two rows of five
        const container = document.createElement('div');
        container.className = 'container';
        document.body.appendChild(container);
        
        top10.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
            <img src="images/${item.team}.png" alt="${item.team}" class="team-image">
            <p>${item.name}</p>
            <p>${item.points} points</p>
            `;
            container.appendChild(itemDiv);
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
        document.body.innerHTML += `<p>Error fetching data: ${error.message}</p>`;
    }
}

window.onload = fetchData;
*/

/**

import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsMXsLI7EnmMaQl5i3SNWjJRMRlZSMOU0",
    authDomain: "cninjas-8ab4e.firebaseapp.com",
    projectId: "cninjas-8ab4e",
    storageBucket: "cninjas-8ab4e.appspot.com",
    messagingSenderId: "383516081066",
    appId: "1:383516081066:web:a0ad2748eda603e013c9d3",
    measurementId: "G-E8GEV2YY4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchData() {
    try {
        const querySnapshot = await getDocs(collection(db, "user1"));
        const teamPoints = {};
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const team = data.team || "N/A";
            const points = parseInt(data.points) || 0; // Parse points as an integer and default to 0 if not present
            
            if (!teamPoints[team]) {
                teamPoints[team] = 0;
            }
            teamPoints[team] += points;
        });
        
        // Convert teamPoints object to an array and sort by total points in descending order
        const sortedTeams = Object.entries(teamPoints).sort((a, b) => b[1] - a[1]);
        
        // Display the total points for each team
        const container = document.createElement('div');
        container.className = 'container';
        document.body.appendChild(container);
        
        sortedTeams.forEach(([team, points]) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
            <img src="images/${team}.png" alt="${team}" class="team-image">
            <p>${points}</p>
            `;
            container.appendChild(itemDiv);
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
        document.body.innerHTML += `<p>Error fetching data: ${error.message}</p>`;
    }
}

window.onload = fetchData;
*/


