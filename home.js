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

// Gets username from login.html
const username = localStorage.getItem('username');

// Display Top Teams
async function displayTopTeams() {
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
        
        sortedTeams.slice(0, 4).forEach(([team, points]) => {
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team-item';
            teamDiv.innerHTML = `
                <div class="top10item-content">
                    <img src="images/${team}.png" alt="${team}" class="team-image">
                    <p>${points} points</p>
                </div>
            `;
            teamContainer.appendChild(teamDiv);
        });
    } catch (error) {
        console.error("Error fetching teams: ", error);
        document.getElementById('teamContainer').innerHTML = `<p>Error fetching teams: ${error.message}</p>`;
    }
}



// Display Top 10 Ninjas
async function displayTop10Ninjas() {
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
        const top10 = dataArray.slice(0, 10);

        // Display the top 10 sorted data in two rows of five
        const container = document.createElement('div');
        container.className = 'container';
        ninjaContainer.appendChild(container);

        top10.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <div class="item-content">
                    <img src="images/${item.team}.png" alt="${item.team}" class="team-image">
                    <p class="name">${item.name}</p>
                    <p class="points">${item.points} points</p>
                </div>
            `;
            container.appendChild(itemDiv);
        });
    } catch (error) {
        console.error("Error fetching top 10 ninjas: ", error);
        document.getElementById('ninjaContainer').innerHTML = `<p>Error fetching top 10 ninjas: ${error.message}</p>`;
    }
}

/* Fetch Random Joke */
let currentJoke = null;
async function fetchRandomJoke() {
    try {
        const jokesSnapshot = await getDocs(collection(db, "Jokes"));
        const jokesArray = [];

        jokesSnapshot.forEach((doc) => {
            jokesArray.push(doc.data());
        });

        if (jokesArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * jokesArray.length);
            currentJoke = jokesArray[randomIndex];
            document.getElementById('jokeText').textContent = currentJoke.joke;
            document.getElementById('anstag').textContent = "";
            document.getElementById('answerText').textContent = "";
        } else {
            document.getElementById('jokeText').textContent = 'No jokes available.';
            document.getElementById('answerText').textContent = '';
            document.querySelector('button[onclick="fetchRandomJoke()"]').style.display = 'none';
        }
    } catch (error) {
        console.error("Error fetching joke: ", error);
        document.getElementById('jokeText').textContent = 'Error fetching joke.';
        document.getElementById('answerText').textContent = '';
    }
}

// Show Answer to the Joke
function showAnswer() {
    if (currentJoke) {
        document.getElementById('anstag').textContent = "Answer";
        document.getElementById('answerText').textContent = currentJoke.answer;
    }
}

// Add New Joke
async function addNewJoke() {
    try {
        const newJokeInput = document.getElementById('newJokeInput');
        const newAnswerInput = document.getElementById('newAnswerInput');
        const newJoke = newJokeInput.value.trim();
        const newAnswer = newAnswerInput.value.trim();

        if (newJoke && newAnswer) {
            await addDoc(collection(db, "Jokes"), {
                joke: newJoke,
                answer: newAnswer
            });

            newJokeInput.value = '';
            newAnswerInput.value = '';
            alert('Joke added successfully!');
        } else {
            alert('Please enter both a joke and an answer.');
        }
    } catch (error) {
        console.error("Error adding joke: ", error);
        alert('Error adding joke.');
    }
}


//Calling functions
document.addEventListener('DOMContentLoaded', () => {
    displayTopTeams();
    displayTop10Ninjas();
});
window.fetchRandomJoke = fetchRandomJoke;
window.showAnswer = showAnswer;
window.addNewJoke = addNewJoke;

