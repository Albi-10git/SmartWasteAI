/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
});

mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

/* =========================
   ECO POINTS SYSTEM
========================= */

let ecoPoints =
parseInt(
localStorage.getItem("ecoPoints")
) || 0;

const ecoDisplay =
document.getElementById(
"ecoPointsDisplay"
);

const activityLog =
document.getElementById(
"activityLog"
);

ecoDisplay.textContent =
ecoPoints;

function addPoints(points, activity){

    ecoPoints += points;

    localStorage.setItem("ecoPoints", ecoPoints);

    ecoDisplay.textContent = ecoPoints;

    // Remove default message
    if(activityLog.innerHTML.includes("No activities completed yet.")){
        activityLog.innerHTML = "";
    }

    const activityItem = document.createElement("p");

    activityItem.innerHTML =
    `✓ ${activity} (+${points})`;

    activityLog.prepend(activityItem);
}

/* =========================
   GEOLOCATION API
========================= */

document.getElementById("locationBtn")
.addEventListener("click", async () => {

    const output =
    document.getElementById("locationOutput");

    output.innerHTML =
    "Detecting your location...";

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
        async (position) => {

            const lat =
            position.coords.latitude;

            const lon =
            position.coords.longitude;

            try {

                const response =
                await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
                );

                const data =
                await response.json();

                output.innerHTML =
                `
                <strong>Current Location:</strong><br>
                ${data.display_name}
                `;
                addPoints(
                5,
                "Location Detected"
                );

            } catch (error) {

                output.innerHTML =
                `
                Location:
                ${lat}, ${lon}
                `;
            }
        });

    } else {

        output.innerHTML =
        "Geolocation not supported.";
    }
});


/* =========================
   FILE API
========================= */

document.getElementById("wasteImage")
.addEventListener("change", (event) => {

    const file =
    event.target.files[0];

    if (file) {

        const preview =
        document.getElementById("imagePreview");

        preview.src =
        URL.createObjectURL(file);

        preview.classList.remove("hidden");
        addPoints(
        10,
        "Waste Image Uploaded"
        );
     }
});

/* =========================
   CLIPBOARD API
========================= */

document.getElementById("copyBtn")
.addEventListener("click", () => {

    navigator.clipboard.writeText(
        "SW12345"
    );

    alert(
    "Tracking ID Copied!"
    );
});


/* =========================
   NOTIFICATION API
========================= */

document.getElementById("notifyBtn")
.addEventListener("click", () => {

    if (Notification.permission !== "granted") {

        Notification.requestPermission();

    } else {

        new Notification(
        "SmartWasteAI Alert",
        {
            body:
            "Municipality has received your waste report and assigned it for processing."
        }
        );
    }
});
/* =========================
   WASTE COMPLAINT FORM VALIDATION
========================= */

document.getElementById("wasteForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    const name =
    document.getElementById("citizenName").value.trim();

    const wasteType =
    document.getElementById("wasteType").value;

    const location =
    document.getElementById("wasteLocation").value.trim();

    const description =
    document.getElementById("description").value.trim();

    const message =
    document.getElementById("formMessage");

    if(name === ""){

        message.innerHTML =
        "Please enter your name.";

        message.style.color = "red";

        return;
    }

    if(wasteType === ""){

        message.innerHTML =
        "Please select a waste type.";

        message.style.color = "red";

        return;
    }

    if(location === ""){

        message.innerHTML =
        "Please enter a location.";

        message.style.color = "red";

        return;
    }

    if(description.length < 10){

        message.innerHTML =
        "Description must contain at least 10 characters.";

        message.style.color = "red";

        return;
    }

    message.innerHTML =
"Complaint submitted successfully!";

message.style.color = "green";

addPoints(
20,
"Waste Complaint Submitted"
);

document.getElementById("wasteForm").reset();

// Clear uploaded complaint image preview
const complaintPreview =
document.getElementById("complaintPreview");

complaintPreview.src = "";
complaintPreview.classList.add("hidden");

// Clear location detection message
document.getElementById("locationStatus").innerHTML = "";

// Reset character counter
document.getElementById("charCount").innerHTML =
"Characters: 0";

});
/* =========================
   COMPLAINT LOCATION
========================= */

document.getElementById("formLocationBtn")
.addEventListener("click", () => {

    const locationField =
    document.getElementById("wasteLocation");

    const status =
    document.getElementById("locationStatus");

    status.innerHTML =
    "Detecting location...";

    if(navigator.geolocation){

        navigator.geolocation
        .getCurrentPosition(

        async(position)=>{

            const lat =
            position.coords.latitude;

            const lon =
            position.coords.longitude;

            try{

                const response =
                await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
                );

                const data =
                await response.json();

                locationField.value =
                data.display_name;
                addPoints(
               5,
               "Complaint Location Detected"
               );

                status.innerHTML =
                "Location detected successfully.";

            }catch(error){

                locationField.value =
                `${lat}, ${lon}`;

                status.innerHTML =
                "Coordinates detected.";
            }
        });

    } else {

        status.innerHTML =
        "Geolocation not supported.";
    }
});
/* =========================
   COMPLAINT IMAGE PREVIEW
========================= */

document.getElementById("complaintImage")
.addEventListener("change",
(event)=>{

    const file =
    event.target.files[0];

    if(file){

        const preview =
        document.getElementById(
        "complaintPreview"
        );

        preview.src =
        URL.createObjectURL(file);

        preview.classList.remove(
        "hidden"
        );
    }
});
/* =========================
   INPUT EVENT
========================= */

const descriptionField =
document.getElementById("description");

descriptionField.addEventListener("input", () => {

    document.getElementById("charCount").innerHTML =
    "Characters: " +
    descriptionField.value.length;

});

/* =========================
   FOCUS EVENT
========================= */

descriptionField.addEventListener("focus", () => {

    descriptionField.style.border =
    "3px solid #2f6b45";

    descriptionField.style.outline =
    "none";

});

/* =========================
   BLUR EVENT
========================= */

descriptionField.addEventListener("blur", () => {

    descriptionField.style.border =
    "1px solid #d1d5db";

});

/* =========================
   RECYCLING AWARENESS
========================= */

document.getElementById("recycleBtn")
.addEventListener("click", () => {

    addPoints(
    10,
    "Recycling Awareness Viewed"
    );

});

/* ==========================================================================
   AUTHENTICATION SYSTEM (MODALS & API INTERACTION)
   ========================================================================== */

// DOM Elements
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');

const loginNavBtn = document.getElementById('login-nav-btn');
const signupNavBtn = document.getElementById('signup-nav-btn');
const loginMobileBtn = document.getElementById('login-mobile-btn');
const signupMobileBtn = document.getElementById('signup-mobile-btn');

const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');

// Navbar UI Elements (Desktop)
const authLoggedOut = document.getElementById('auth-logged-out');
const authLoggedIn = document.getElementById('auth-logged-in');
const userGreeting = document.getElementById('user-greeting');
const profileMenuBtn = document.getElementById('profile-menu-btn');
const profileInitial = document.getElementById('profile-initial');
const profileDropdown = document.getElementById('profile-dropdown');
const dropdownUsername = document.getElementById('dropdown-username');
const dropdownEmail = document.getElementById('dropdown-email');
const logoutBtn = document.getElementById('logout-btn');

// Navbar UI Elements (Mobile)
const mobileAuthLoggedOut = document.getElementById('mobile-auth-logged-out');
const mobileAuthLoggedIn = document.getElementById('mobile-auth-logged-in');
const mobileProfileInitial = document.getElementById('mobile-profile-initial');
const mobileUsername = document.getElementById('mobile-username');
const mobileEmail = document.getElementById('mobile-email');
const logoutMobileBtn = document.getElementById('logout-mobile-btn');

// State Helper Functions
function showModal(modal) {
    modal.classList.remove('hidden');
    // Trigger CSS scale animation helper
    setTimeout(() => {
        const dialog = modal.querySelector('.glass-panel');
        if (dialog) {
            dialog.classList.remove('scale-95');
            dialog.classList.add('scale-100');
        }
    }, 10);
}

function hideModal(modal) {
    const dialog = modal.querySelector('.glass-panel');
    if (dialog) {
        dialog.classList.remove('scale-100');
        dialog.classList.add('scale-95');
    }
    setTimeout(() => {
        modal.classList.add('hidden');
        // Reset errors and forms
        loginError.classList.add('hidden');
        signupError.classList.add('hidden');
        loginForm.reset();
        signupForm.reset();
    }, 150);
}

function updateAuthUI(user) {
    if (user) {
        // Desktop
        authLoggedOut.classList.add('hidden');
        authLoggedIn.classList.remove('hidden');
        userGreeting.textContent = `Hello, ${user.username}`;
        profileInitial.textContent = user.username.charAt(0).toUpperCase();
        dropdownUsername.textContent = user.username;
        dropdownEmail.textContent = user.email;

        // Mobile
        mobileAuthLoggedOut.classList.add('hidden');
        mobileAuthLoggedIn.classList.remove('hidden');
        mobileProfileInitial.textContent = user.username.charAt(0).toUpperCase();
        mobileUsername.textContent = user.username;
        mobileEmail.textContent = user.email;
    } else {
        // Desktop
        authLoggedOut.classList.remove('hidden');
        authLoggedIn.classList.add('hidden');
        profileDropdown.classList.add('hidden');

        // Mobile
        mobileAuthLoggedOut.classList.remove('hidden');
        mobileAuthLoggedIn.classList.add('hidden');
    }
}

// Check Login Status on Page Load
async function checkLoginStatus() {
    try {
        const response = await fetch('/api/me');
        const data = await response.json();
        if (data.loggedIn) {
            updateAuthUI(data.user);
        } else {
            updateAuthUI(null);
        }
    } catch (error) {
        console.error('Error fetching auth status:', error);
        updateAuthUI(null);
    }
}

// Event Listeners for Opening/Closing Modals
[loginNavBtn, loginMobileBtn].forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => showModal(loginModal));
    }
});

[signupNavBtn, signupMobileBtn].forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => showModal(signupModal));
    }
});

// Close buttons inside modals
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.fixed');
        if (modal) hideModal(modal);
    });
});

// Close modals on clicking background backdrop
[loginModal, signupModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(modal);
        }
    });
});

// Switch links between modals
switchToSignup.addEventListener('click', () => {
    hideModal(loginModal);
    setTimeout(() => showModal(signupModal), 200);
});

switchToLogin.addEventListener('click', () => {
    hideModal(signupModal);
    setTimeout(() => showModal(loginModal), 200);
});

// Toggle Profile Dropdown
profileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('hidden');
});

// Close profile dropdown on clicking anywhere outside
window.addEventListener('click', () => {
    if (!profileDropdown.classList.contains('hidden')) {
        profileDropdown.classList.add('hidden');
    }
});

// Prevent dropdown close when clicking inside it
profileDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
});

/* ==========================================================================
   FORM SUBMISSIONS & API CALLS
   ========================================================================== */

// 1. Submit Sign Up
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    signupError.classList.add('hidden');

    // Validation
    if (password !== confirmPassword) {
        signupError.textContent = 'Passwords do not match.';
        signupError.classList.remove('hidden');
        return;
    }

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();

        if (response.ok) {
            hideModal(signupModal);
            updateAuthUI(data.user);
            addPoints(50, 'Account Registered Successfully');
        } else {
            signupError.textContent = data.error || 'Registration failed.';
            signupError.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Signup error:', error);
        signupError.textContent = 'Network error. Please try again.';
        signupError.classList.remove('hidden');
    }
});

// 2. Submit Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usernameOrEmail = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;

    loginError.classList.add('hidden');

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernameOrEmail, password })
        });
        const data = await response.json();

        if (response.ok) {
            hideModal(loginModal);
            updateAuthUI(data.user);
            addPoints(10, 'Welcome back!');
        } else {
            loginError.textContent = data.error || 'Login failed.';
            loginError.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Login error:', error);
        loginError.textContent = 'Network error. Please try again.';
        loginError.classList.remove('hidden');
    }
});

// 3. Logout handlers
async function handleLogout() {
    try {
        const response = await fetch('/api/logout', { method: 'POST' });
        if (response.ok) {
            updateAuthUI(null);
        } else {
            alert('Failed to log out.');
        }
    } catch (error) {
        console.error('Logout error:', error);
        alert('Network error. Failed to log out.');
    }
}

logoutBtn.addEventListener('click', handleLogout);
logoutMobileBtn.addEventListener('click', handleLogout);

// Initial check on load
checkLoginStatus();