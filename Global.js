import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

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

const username = localStorage.getItem('username');

let num=1;

// Display Top 10 Ninjas
async function displayTop5Ninjas() {
    try {
        const querySnapshot = await getDocs(collection(db, username));
        const dataArray = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const name = data.name || "N/A";
            const points = parseInt(data.points) || 0; // Parse points as an integer and default to 0 if not present
            const team = data.team || "N/A";
        
            dataArray.push({ name, points, team });
        });

        // Sort the array by points in descending order
        dataArray.sort((a, b) => b.points - a.points);

        // Get only the top 10 entries
        const top10 = dataArray.slice(0, 5);

        // Display the top 10 sorted data in two rows of five
        const top5 = document.getElementById('top5');
        top5.innerHTML = ''; // Clear existing content

        top10.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'team-item';
            itemDiv.innerHTML = `
                <div class="top5item-content">
                    <h1>${num}</h1>
                    <img src="images/${item.team}.png" alt="${item.team}" class="top-image">
                    <p class="name">${item.name}</p>
                    <p class="points">${item.points} points</p>
                </div>
            `;
            num+=1;
            top5.appendChild(itemDiv);
        });
    } catch (error) {
        console.error("Error fetching top 10 ninjas: ", error);
        document.getElementById('top5').innerHTML = `<p>Error fetching top 10 ninjas: ${error.message}</p>`;
    }
}
async function therest() {
    try {
        const querySnapshot = await getDocs(collection(db, username));
        const dataArray = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const name = data.name || "N/A";
            const points = parseInt(data.points) || 0; // Parse points as an integer and default to 0 if not present
            const team = data.team || "N/A";
        
            dataArray.push({ name, points, team });
        });

        // Sort the array by points in descending order
        dataArray.sort((a, b) => b.points - a.points);

        // Get only the top 10 entries
        const top10 = dataArray.slice(5);

        // Display the top 10 sorted data in two rows of five
        const container = document.createElement('div');
        container.className = 'container2';
        ninjaContainer2.appendChild(container);

        top10.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item2';
            itemDiv.innerHTML = `
                <div class="item-content2">
                    <h3>${num}</h3>
                    <img src="images/${item.team}.png" alt="${item.team}" class="team-image2">
                    <p class="name">${item.name}</p>
                    <p class="points">${item.points} points</p>
                </div>
            `;
            num+=1;
            container.appendChild(itemDiv);
        });
    } catch (error) {
        console.error("The rest: ", error);
        document.getElementById('ninjaContainer2').innerHTML = `<p>The rest: ${error.message}</p>`;
    }
}





window.displayTop5Ninjas=displayTop5Ninjas();
window.therest=therest();
