const registrationForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const submitBtn = document.getElementById('submitBtn');
const chosenCiv = localStorage.getItem('selectedCivilization') || null;

let betaTesters = ['#Jqc6aJql' /* Dave Summer, lead developer */];

export function checkBetaTester() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userTag = loggedInUser.playerTag;
    if(Object.values(betaTesters).includes(userTag) && (chosenCiv === null || !chosenCiv)) window.location.href = './civilization_chooser.html';
    else if(!Object.values(betaTesters).includes(userTag)) window.location.href = './nonbeta.html';
};

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generatePlayerTag() {
    const characters = 'aAáÁbBcCdDeEéÉfFgGhHiIíÍjJkKlLmMnNoOóÓöÖőŐpPqQrRsStTuUúÚüÜűŰvVwWxXyYzZ0123456789';
    let playerTag = '#';

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        playerTag += characters[randomIndex];
    }

    return playerTag;
}

if (registrationForm) {
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const confirmEmail = document.getElementById('confirmEmail').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const age = parseInt(document.getElementById('age').value, 10);

        if (!username || !email || !confirmEmail || !password || !confirmPassword || !age) {
            alert('All fields are required!');
            return;
        }

        if (!isEmailValid(email)) {
            alert('Invalid email format!');
            return;
        }

        if (email !== confirmEmail) {
            alert('Email do not match!');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username || user.email === email);

        if (userExists) {
            alert('A user with this username already exists!');
            return;
        }

        const newUser = {
            username,
            email,
            password,
            age,
            playerTag: generatePlayerTag()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Redirecting to the login page...');
        window.location.href = './login.html';
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.username === username && u.password === password);

        if (!user) {
            alert('Invalid username or password!');
            return;
        }

        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful! Redirecting to CivilWars!');
    });
}

submitBtn.addEventListener('click', () => checkBetaTester());

document.addEventListener('DOMContentLoaded', () => {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    if (isMobile) window.location.href = './mobile.html';
});
