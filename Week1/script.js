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
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobil Menyu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ===============================================
    // CHECKPOINT 4: ƏLAQƏ FORMU VALİDASİYASI
    // ===============================================
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Email və Ad Regex Şablonları
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasNumbersRegex = /\d/; // Rəqəm olub-olmadığını yoxlayır

    // Xəta göstərmək üçün köməkçi funksiya
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.add('has-error');
        return false;
    }

function clearError(input, errorElement) {
    errorElement.textContent = ''; // Mətni silirik ki, CSS avtomatik gizlətsin
    input.classList.remove('has-error');
    return true;
}

    // 1. Ad Sahəsi Yoxlanışı (Boşluq + Rəqəm Yoxlanışı)
    function checkName() {
        const val = nameInput.value.trim();
        if (val === '') {
            return showError(nameInput, nameError, 'Ad və soyad boş ola bilməz.');
        } else if (hasNumbersRegex.test(val)) {
            return showError(nameInput, nameError, 'Ad və soyadda rəqəm istifadə edilə bilməz.');
        } else if (val.length < 2) {
            return showError(nameInput, nameError, 'Ad və soyad ən azı 2 hərfdən ibarət olmalıdır.');
        } else {
            return clearError(nameInput, nameError);
        }
    }

    // 2. Email Sahəsi Yoxlanışı
    function checkEmail() {
        const val = emailInput.value.trim();
        if (val === '') {
            return showError(emailInput, emailError, 'Elektron poçt boş ola bilməz.');
        } else if (!emailRegex.test(val)) {
            return showError(emailInput, emailError, 'Düzgün e-poçt ünvanı daxil edin.');
        } else {
            return clearError(emailInput, emailError);
        }
    }

    // 3. Mesaj Sahəsi Yoxlanışı
    function checkMessage() {
        const val = messageInput.value.trim();
        if (val === '') {
            return showError(messageInput, messageError, 'Mesaj sahəsi boş ola bilməz.');
        } else if (val.length < 5) {
            return showError(messageInput, messageError, 'Mesajınız ən azı 5 simvol olmalıdır.');
        } else {
            return clearError(messageInput, messageError);
        }
    }

    // Canlı yoxlanış (yazdıqca input altında görünür)
    if (nameInput) nameInput.addEventListener('input', checkName);
    if (emailInput) emailInput.addEventListener('input', checkEmail);
    if (messageInput) messageInput.addEventListener('input', checkMessage);

    // Form Göndəriləndə (Submit)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const isNameValid = checkName();
            const isEmailValid = checkEmail();
            const isMessageValid = checkMessage();

            // Əgər bütün sahələr düzgündürsə, formun altında uğur mesajı göstər
            if (isNameValid && isEmailValid && isMessageValid) {
                let successMessage = document.getElementById('form-success');
                if (!successMessage) {
                    successMessage = document.createElement('div');
                    successMessage.id = 'form-success';
                    successMessage.style.color = '#16a34a';
                    successMessage.style.fontWeight = 'bold';
                    successMessage.style.marginTop = '1rem';
                    successMessage.style.textAlign = 'center';
                    form.appendChild(successMessage);
                }
                
                successMessage.textContent = 'Təşəkkür edirik! Mesajınız uğurla göndərildi.';
                form.reset();

                // 4 saniyə sonra uğur mesajını sil
                setTimeout(() => {
                    successMessage.remove();
                }, 4000);
            }
        });
    }
});