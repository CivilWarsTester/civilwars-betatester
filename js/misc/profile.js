const profileModal = document.getElementById('profileModal');
const closeButton = document.getElementById('close-button');
const logoutButton = document.getElementById('logoutButton');

const user = JSON.parse(localStorage.getItem('loggedInUser'));
const chosenCiv = localStorage.getItem('selectedCivilization');

const username = user.username;
const email = user.email;
const civilization = chosenCiv;
const level = user.level || 1;
const xp = user.xp || 0;
const title = user.title || '';
const playerTag = user.playerTag;

document.getElementById('profileUsername').textContent = username || `Guest ${playerTag}`;
document.getElementById('playerTitle').textContent = title;
document.getElementById('profileEmail').textContent = email;
document.getElementById('profileCiv').textContent = civilization;
document.getElementById('profileLevel').textContent = level;
document.getElementById('profileXP').textContent = `${xp} / 50`;
document.getElementById('playerTag').textContent = playerTag;

document.getElementById('profileButton').addEventListener('click', () => profileModal.style.display = 'block');
closeButton.addEventListener('click', () => profileModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if(e.target === profileModal) profileModal.style.display = 'none';
});

logoutButton.onclick = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = './auth/login.html';
};