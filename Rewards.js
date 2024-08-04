import { getFirestore, collection, getDocs, addDoc, query, where, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
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

const username = localStorage.getItem('username');


// Display Top Team
async function displayTopTeam() {
    try {
        const querySnapshot = await getDocs(collection(db, username));
        const teamPoints = {};

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const points = parseInt(data.points) || 0; // Parse points as an integer and default to 0 if not present
            const team = data.team || "N/A";
        
            if (!teamPoints[team]) {
                teamPoints[team] = 0;
            }
            teamPoints[team] += points;
        });

        // Display the total points for each team
        const sortedTeams = Object.entries(teamPoints).sort((a, b) => b[1] - a[1]);

        const teamContainer = document.getElementById('teamContainer');
        teamContainer.innerHTML = ''; // Clear existing content
        
        if (sortedTeams.length > 0) {
            const [topTeam, topPoints] = sortedTeams[0];
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team-item';
            teamDiv.innerHTML = `
                <div class="top10item-content">
                    <img src="images/${topTeam}.png" alt="${topTeam}" class="team-image">
                    <div>
                    <p class="champion-caption">Current House Champion</p>
                    </div>
                    <img src="images/${topTeam}.png" alt="${topTeam}" class="team-image">
                </div>
            `;
            teamContainer.appendChild(teamDiv);
        } else {
            teamContainer.innerHTML = '<p>No teams found.</p>';
        }
    } catch (error) {
        console.error("Error fetching teams: ", error);
        document.getElementById('teamContainer').innerHTML = `<p>Error fetching teams: ${error.message}</p>`;
    }
}


const prizes = [
    'Prizes/logo.png',
    'Prizes/Trophie.png',
    'Prizes/logo.png'
]

const challenge = [
    "challenge1lKJHEFPQIUHRFQPIURHQFPIRHF IPUEHFQPIRFHQCPIURFH QPIRHCPIURH IQPRHIGQPEU QIP RGQRI ",
    "challange2",
    "challenge3"
]

// Function to get monthly prize and challenge
async function getMonthlyPrize() {

    document.getElementById('prize-image').src = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById('prize-challenge').textContent = challenge[Math.floor(Math.random() * challenge.length)];
    console.log("No such document!");
    
}

// Call the function to display the prize and challenge
getMonthlyPrize();

    

document.addEventListener('DOMContentLoaded', () => {
    displayTopTeam();
});





