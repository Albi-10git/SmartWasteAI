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
    }
});


/* =========================
   LOCAL STORAGE API
========================= */

const savedPoints =
localStorage.getItem("ecoPoints");

if (savedPoints) {

    document.getElementById("savedPoints")
    .innerHTML =
    `Stored Eco Points: ${savedPoints}`;
}

document.getElementById("savePoints")
.addEventListener("click", () => {

    const points =
    document.getElementById("ecoPoints")
    .value;

    localStorage.setItem(
        "ecoPoints",
        points
    );

    document.getElementById("savedPoints")
    .innerHTML =
    `Stored Eco Points: ${points}`;
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