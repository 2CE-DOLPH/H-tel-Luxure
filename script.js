// Variables globales
let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
const roomPrices = {
    standard: 1200000,
    deluxe: 1800000,
    suite: 3500000
};

// Initialisation du site
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeReservationForm();
    initializeContactForm();
    setMinDate();
    updateReservationSummary();
});

// Navigation mobile
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fermer le menu lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navigation fluide
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Changement de style de la navbar au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Configuration des dates minimales
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    checkinInput.min = today;
    checkoutInput.min = today;

    // Mise à jour de la date de checkout quand checkin change
    checkinInput.addEventListener('change', function() {
        if (this.value) {
            const checkinDate = new Date(this.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            checkoutInput.min = checkinDate.toISOString().split('T')[0];
            
            // Si checkout est antérieur à checkin, le réinitialiser
            if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(this.value)) {
                checkoutInput.value = '';
            }
        }
        updateReservationSummary();
    });

    checkoutInput.addEventListener('change', updateReservationSummary);
}

// Système de réservation
function initializeReservationForm() {
    const form = document.getElementById('reservationForm');
    const roomTypeSelect = document.getElementById('roomType');
    const guestsSelect = document.getElementById('guests');

    // Mise à jour du résumé lors des changements
    roomTypeSelect.addEventListener('change', updateReservationSummary);
    guestsSelect.addEventListener('change', updateReservationSummary);

    // Soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleReservationSubmission();
    });
}

// Mise à jour du résumé de réservation
function updateReservationSummary() {
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const roomType = document.getElementById('roomType').value;
    const guests = document.getElementById('guests').value;
    const summaryDiv = document.getElementById('reservationSummary');
    const summaryContent = document.getElementById('summaryContent');
    const totalPrice = document.getElementById('totalPrice');

    if (checkin && checkout && roomType && guests) {
        const nights = calculateNights(checkin, checkout);
        const pricePerNight = roomPrices[roomType];
        const total = nights * pricePerNight;

        const roomTypeNames = {
            standard: 'Chambre Standard',
            deluxe: 'Chambre Deluxe',
            suite: 'Suite Présidentielle'
        };

        summaryContent.innerHTML = `
            <div class="summary-item">
                <strong>Dates:</strong> ${formatDate(checkin)} - ${formatDate(checkout)}
            </div>
            <div class="summary-item">
                <strong>Durée:</strong> ${nights} nuit${nights > 1 ? 's' : ''}
            </div>
            <div class="summary-item">
                <strong>Chambre:</strong> ${roomTypeNames[roomType]}
            </div>
            <div class="summary-item">
                <strong>Invitations:</strong> ${guests} invité${guests > 1 ? 's' : ''}
            </div>
            <div class="summary-item">
                <strong>Prix par nuit:</strong> ${pricePerNight}fng
            </div>
        `;

        totalPrice.innerHTML = `Total: ${total}fng`;

        summaryDiv.style.display = 'block';
    } else {
        summaryDiv.style.display = 'none';
    }
}

// Calcul du nombre de nuits
function calculateNights(checkin, checkout) {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Formatage des dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Traitement de la soumission de réservation
function handleReservationSubmission() {
    const form = document.getElementById('reservationForm');
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Désactiver le bouton et afficher le loading
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Traitement...';

    // Simuler un délai de traitement
    setTimeout(() => {
        const reservation = {
            id: Date.now(),
            checkin: formData.get('checkin'),
            checkout: formData.get('checkout'),
            guests: formData.get('guests'),
            roomType: formData.get('roomType'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            specialRequests: formData.get('specialRequests'),
            status: 'confirmée',
            dateCreated: new Date().toISOString()
        };

        // Ajouter à la liste des réservations
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        // Afficher la confirmation
        showConfirmationModal(reservation);

        // Réinitialiser le formulaire
        form.reset();
        document.getElementById('reservationSummary').style.display = 'none';

        // Réactiver le bouton
        submitButton.disabled = false;
        submitButton.innerHTML = 'Confirmer la réservation';
    }, 2000);
}

// Affichage du modal de confirmation
function showConfirmationModal(reservation) {
    const modal = document.getElementById('confirmationModal');
    const details = document.getElementById('confirmationDetails');
    
    const nights = calculateNights(reservation.checkin, reservation.checkout);
    const total = nights * roomPrices[reservation.roomType];
    
    const roomTypeNames = {
        standard: 'Chambre Standard',
        deluxe: 'Chambre Deluxe',
        suite: 'Suite Présidentielle'
    };

    details.innerHTML = `
        <div class="confirmation-details">
            <p><strong>Numéro de réservation:</strong> #${reservation.id}</p>
            <p><strong>Nom:</strong> ${reservation.firstName} ${reservation.lastName}</p>
            <p><strong>Email:</strong> ${reservation.email}</p>
            <p><strong>Dates:</strong> ${formatDate(reservation.checkin)} - ${formatDate(reservation.checkout)}</p>
            <p><strong>Chambre:</strong> ${roomTypeNames[reservation.roomType]}</p>
            <p><strong>Invitations:</strong> ${reservation.guests}</p>
            <p><strong>Total:</strong> ${total}€</p>
        </div>
    `;

    modal.style.display = 'block';

    // Fermer le modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Formulaire de contact
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactSubmission();
    });
}

// Traitement du formulaire de contact
function handleContactSubmission() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Désactiver le bouton
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Envoi...';

    // Simuler l'envoi
    setTimeout(() => {
        alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
        form.reset();
        
        // Réactiver le bouton
        submitButton.disabled = false;
        submitButton.innerHTML = 'Envoyer le message';
    }, 1500);
}

// Animation au scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.room-card, .service-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Gestion des erreurs de validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#ecf0f1';
        }
    });

    // Validation email
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }

    // Validation téléphone
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(phoneField.value)) {
            phoneField.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }

    return isValid;
}

// Fonction utilitaire pour formater les prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Gestion des disponibilités (simulation)
function checkAvailability(checkin, checkout, roomType) {
    // Simulation simple - en réalité, ceci ferait appel à une API
    const conflictingReservations = reservations.filter(res => {
        return res.roomType === roomType && 
               res.status === 'confirmée' &&
               ((new Date(res.checkin) <= new Date(checkout)) && 
                (new Date(res.checkout) >= new Date(checkin)));
    });
    
    return conflictingReservations.length === 0;
}

// Notification toast
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// CSS pour les animations de notification
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Initialiser les animations au scroll
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
});

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
});

// Service Worker pour le cache (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker enregistré avec succès');
            })
            .catch(function(error) {
                console.log('Échec de l\'enregistrement du ServiceWorker');
            });
    });
}
