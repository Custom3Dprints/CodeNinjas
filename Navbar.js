const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo')

//Mobile Menu
menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


function Home() {
    window.location.href = "Home.html";
}
function Ninjas() {
    window.location.href = "AddNinja.html";
}
function Global() {
    window.location.href = "Global.html";
}
function Rewards() {
    window.location.href = "Rewards.html";
}
