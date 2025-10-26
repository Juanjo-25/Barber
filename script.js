// Data Structure for Barbershops and Barbers
const barbershopsData = [
    {
        id: 1,
        name: "Classic Barber Studio",
        location: "Centro, Madrid",
        description: "Especialistas en cortes clásicos y afeitado tradicional con navaja",
        icon: "💈",
        rating: 4.8,
        totalRatings: 127,
        barbers: [
            {
                id: 101,
                name: "Carlos Mendez",
                specialty: "Cortes clásicos y afeitado tradicional",
                experience: "15 años de experiencia",
                rating: 4.9,
                totalRatings: 89
            },
            {
                id: 102,
                name: "Miguel Torres",
                specialty: "Estilista moderno y diseños creativos",
                experience: "8 años de experiencia",
                rating: 4.7,
                totalRatings: 64
            },
            {
                id: 103,
                name: "David Ruiz",
                specialty: "Especialista en barba y bigote",
                experience: "12 años de experiencia",
                rating: 4.8,
                totalRatings: 73
            }
        ]
    },
    {
        id: 2,
        name: "Modern Style Barber",
        location: "Salamanca, Madrid",
        description: "Tendencias modernas y cortes urbanos para el hombre contemporáneo",
        icon: "✂",
        rating: 4.7,
        totalRatings: 98,
        barbers: [
            {
                id: 201,
                name: "Javier Morales",
                specialty: "Cortes fade y degradados modernos",
                experience: "10 años de experiencia",
                rating: 4.8,
                totalRatings: 56
            },
            {
                id: 202,
                name: "Alex Fernandez",
                specialty: "Diseños artísticos y líneas definidas",
                experience: "7 años de experiencia",
                rating: 4.6,
                totalRatings: 48
            },
            {
                id: 203,
                name: "Roberto Silva",
                specialty: "Color y tintes para cabello masculino",
                experience: "9 años de experiencia",
                rating: 4.7,
                totalRatings: 52
            }
        ]
    },
    {
        id: 3,
        name: "Elegance Grooming",
        location: "Retiro, Madrid",
        description: "Experiencia premium de barbería con servicios de lujo",
        icon: "👔",
        rating: 4.9,
        totalRatings: 156,
        barbers: [
            {
                id: 301,
                name: "Antonio Garcia",
                specialty: "Maestro barbero con técnicas tradicionales",
                experience: "20 años de experiencia",
                rating: 5.0,
                totalRatings: 92
            },
            {
                id: 302,
                name: "Fernando Lopez",
                specialty: "Estilo ejecutivo y cuidado facial",
                experience: "14 años de experiencia",
                rating: 4.8,
                totalRatings: 78
            },
            {
                id: 303,
                name: "Luis Martinez",
                specialty: "Cortes personalizados y asesoría de imagen",
                experience: "11 años de experiencia",
                rating: 4.9,
                totalRatings: 85
            }
        ]
    },
    {
        id: 4,
        name: "Urban Cuts",
        location: "Malasaña, Madrid",
        description: "Estilo urbano y alternativo en un ambiente relajado",
        icon: "🎨",
        rating: 4.6,
        totalRatings: 84,
        barbers: [
            {
                id: 401,
                name: "Pablo Jimenez",
                specialty: "Cortes alternativos y undercut",
                experience: "6 años de experiencia",
                rating: 4.7,
                totalRatings: 45
            },
            {
                id: 402,
                name: "Sergio Ramirez",
                specialty: "Estilo rockero y mohawks",
                experience: "9 años de experiencia",
                rating: 4.5,
                totalRatings: 38
            },
            {
                id: 403,
                name: "Daniel Castro",
                specialty: "Cortes texturizados y productos para el cabello",
                experience: "7 años de experiencia",
                rating: 4.6,
                totalRatings: 41
            }
        ]
    }
];

// State Management
let currentBarbershop = null;
let currentBarber = null;
let currentRatingTarget = null;
let currentRatingType = null;
let selectedRating = 0;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    loadBarbershops();
    initializeBookingForm();
    initializeRatingStars();
    setMinDate();
});

// Load Barbershops
function loadBarbershops() {
    const grid = document.getElementById('barbershopsGrid');
    grid.innerHTML = '';
    
    barbershopsData.forEach(barbershop => {
        const card = createBarbershopCard(barbershop);
        grid.appendChild(card);
    });
}

// Create Barbershop Card
function createBarbershopCard(barbershop) {
    const card = document.createElement('div');
    card.className = 'barbershop-card';
    card.innerHTML = `
        <span class="card-icon">${barbershop.icon}</span>
        <h3 class="card-title">${barbershop.name}</h3>
        <p class="card-location">📍 ${barbershop.location}</p>
        <p class="card-description">${barbershop.description}</p>
        <div class="card-rating">
            <span class="stars">${generateStars(barbershop.rating)}</span>
            <span class="rating-value">${barbershop.rating} (${barbershop.totalRatings})</span>
            <button class="rate-btn" onclick="openRatingModal(${barbershop.id}, 'barbershop', event)">Calificar</button>
        </div>
    `;
    
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('rate-btn')) {
            showBarbers(barbershop);
        }
    });
    
    return card;
}

// Show Barbers Section
function showBarbers(barbershop) {
    currentBarbershop = barbershop;
    
    // Hide barbershops section
    document.getElementById('barbershops').style.display = 'none';
    
    // Show barbers section
    const barbersSection = document.getElementById('barbersSection');
    barbersSection.classList.remove('hidden');
    
    // Update barbershop info
    document.getElementById('barbershopTitle').textContent = barbershop.name;
    
    // Update barbershop rating
    const ratingDiv = document.getElementById('barbershopRating');
    ratingDiv.innerHTML = `
        <span class="stars" style="font-size: 1.5rem;">${generateStars(barbershop.rating)}</span>
        <span class="rating-value" style="font-size: 1.1rem;">${barbershop.rating} (${barbershop.totalRatings} valoraciones)</span>
        <button class="rate-btn" onclick="openRatingModal(${barbershop.id}, 'barbershop', event)" style="margin-left: 1rem;">Calificar Barbería</button>
    `;
    
    // Load barbers
    loadBarbers(barbershop.barbers);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Load Barbers
function loadBarbers(barbers) {
    const grid = document.getElementById('barbersGrid');
    grid.innerHTML = '';
    
    barbers.forEach(barber => {
        const card = createBarberCard(barber);
        grid.appendChild(card);
    });
}

// Create Barber Card
function createBarberCard(barber) {
    const card = document.createElement('div');
    card.className = 'barber-card';
    card.innerHTML = `
        <span class="card-icon">👨‍💼</span>
        <h3 class="card-title">${barber.name}</h3>
        <p class="card-specialty">${barber.specialty}</p>
        <p class="card-description">${barber.experience}</p>
        <div class="card-rating">
            <span class="stars">${generateStars(barber.rating)}</span>
            <span class="rating-value">${barber.rating} (${barber.totalRatings})</span>
            <button class="rate-btn" onclick="openRatingModal(${barber.id}, 'barber', event)">Calificar</button>
        </div>
    `;
    
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('rate-btn')) {
            openBookingModal(barber);
        }
    });
    
    return card;
}

// Generate Stars HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    if (hasHalfStar) {
        stars += '☆';
    }
    
    return stars;
}

// Go Back to Barbershops
function goBackToBarbershops() {
    document.getElementById('barbersSection').classList.add('hidden');
    document.getElementById('barbershops').style.display = 'block';
    currentBarbershop = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open Booking Modal
function openBookingModal(barber) {
    currentBarber = barber;
    
    const modal = document.getElementById('bookingModal');
    document.getElementById('modalBarbershop').textContent = currentBarbershop.name;
    document.getElementById('modalBarber').textContent = barber.name;
    
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);
}

// Close Booking Modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('show');
    setTimeout(() => modal.classList.add('hidden'), 300);
    document.getElementById('bookingForm').reset();
}

// Initialize Booking Form
function initializeBookingForm() {
    const form = document.getElementById('bookingForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleBookingSubmit();
    });
}

// Handle Booking Submit
function handleBookingSubmit() {
    const formData = {
        clientName: document.getElementById('clientName').value,
        clientPhone: document.getElementById('clientPhone').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        service: document.getElementById('serviceType').value,
        barbershop: currentBarbershop.name,
        barber: currentBarber.name
    };
    
    console.log('Booking submitted:', formData);
    
    closeBookingModal();
    showSuccessMessage(`¡Cita confirmada! Te esperamos el ${formatDate(formData.date)} a las ${formData.time}`);
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Set Minimum Date for Booking
function setMinDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    document.getElementById('appointmentDate').setAttribute('min', minDate);
}

// Open Rating Modal
function openRatingModal(id, type, event) {
    if (event) {
        event.stopPropagation();
    }
    
    currentRatingType = type;
    selectedRating = 0;
    
    if (type === 'barbershop') {
        const barbershop = barbershopsData.find(b => b.id === id);
        currentRatingTarget = barbershop;
        document.getElementById('ratingTargetName').textContent = `Calificar: ${barbershop.name}`;
    } else {
        // Find barber in current barbershop
        const barber = currentBarbershop.barbers.find(b => b.id === id);
        currentRatingTarget = barber;
        document.getElementById('ratingTargetName').textContent = `Calificar: ${barber.name}`;
    }
    
    // Reset stars
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('active');
    });
    
    document.getElementById('ratingText').textContent = 'Selecciona una calificación';
    
    const modal = document.getElementById('ratingModal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);
}

// Close Rating Modal
function closeRatingModal() {
    const modal = document.getElementById('ratingModal');
    modal.classList.remove('show');
    setTimeout(() => modal.classList.add('hidden'), 300);
    selectedRating = 0;
}

// Initialize Rating Stars
function initializeRatingStars() {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));
            updateStarDisplay();
        });
        
        star.addEventListener('mouseenter', function() {
            const value = parseInt(this.getAttribute('data-value'));
            highlightStars(value);
        });
    });
    
    const container = document.getElementById('starsContainer');
    container.addEventListener('mouseleave', function() {
        if (selectedRating > 0) {
            highlightStars(selectedRating);
        } else {
            highlightStars(0);
        }
    });
}

// Highlight Stars
function highlightStars(count) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < count) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    if (count > 0) {
        const ratingTexts = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
        document.getElementById('ratingText').textContent = ratingTexts[count - 1];
    }
}

// Update Star Display
function updateStarDisplay() {
    highlightStars(selectedRating);
}

// Submit Rating
function submitRating() {
    if (selectedRating === 0) {
        alert('Por favor selecciona una calificación');
        return;
    }
    
    // Store rating value before closing modal
    const ratingValue = selectedRating;
    
    // Calculate new rating
    const oldTotal = currentRatingTarget.rating * currentRatingTarget.totalRatings;
    currentRatingTarget.totalRatings += 1;
    currentRatingTarget.rating = Math.round(((oldTotal + selectedRating) / currentRatingTarget.totalRatings) * 10) / 10;
    
    // Update display
    if (currentRatingType === 'barbershop') {
        loadBarbershops();
        if (currentBarbershop && currentBarbershop.id === currentRatingTarget.id) {
            currentBarbershop = currentRatingTarget;
            const ratingDiv = document.getElementById('barbershopRating');
            if (ratingDiv) {
                ratingDiv.innerHTML = `
                    <span class="stars" style="font-size: 1.5rem;">${generateStars(currentRatingTarget.rating)}</span>
                    <span class="rating-value" style="font-size: 1.1rem;">${currentRatingTarget.rating} (${currentRatingTarget.totalRatings} valoraciones)</span>
                    <button class="rate-btn" onclick="openRatingModal(${currentRatingTarget.id}, 'barbershop', event)" style="margin-left: 1rem;">Calificar Barbería</button>
                `;
            }
        }
    } else {
        if (currentBarbershop) {
            loadBarbers(currentBarbershop.barbers);
        }
    }
    
    closeRatingModal();
    showSuccessMessage(`¡Gracias por tu calificación de ${ratingValue} estrellas!`);
}

// Show Success Message
function showSuccessMessage(message) {
    const messageDiv = document.getElementById('successMessage');
    messageDiv.querySelector('.success-text').textContent = message;
    messageDiv.classList.remove('hidden');
    messageDiv.classList.add('show');
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.classList.add('hidden'), 400);
    }, 3000);
}

// Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const bookingModal = document.getElementById('bookingModal');
    const ratingModal = document.getElementById('ratingModal');
    
    if (e.target === bookingModal) {
        closeBookingModal();
    }
    
    if (e.target === ratingModal) {
        closeRatingModal();
    }
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
