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

    document.getElementById("charCount")
    .innerHTML = "Characters: 0";

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