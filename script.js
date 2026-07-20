const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.onclick = () => {
    navMenu.classList.toggle('active');
};

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.onclick = function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }

        navMenu.classList.remove('active');
    };
});