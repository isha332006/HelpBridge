const BACKEND_URL = "helpbridge-production.up.railway.app";
// Scroll to a specific section smoothly
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Function to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
    } else {
        sidebar.style.left = "0px";
    }
}
async function fetchAndDisplayTotalFunds() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/donations/total`);
        const data = await res.json();
        document.getElementById('fund-amount1').textContent = `₹${data.total.toLocaleString()}`;
    } catch (err) {
        console.error("Failed to fetch total donations:", err.message);
    }
}
// Function to update content based on the selected option
function selectOption(option) {
    const contentDisplay = document.getElementById("content-display");
    let content = "";

    switch (option) {
        case "national-issues":
            content = "<h2>National Issues</h2><p>Details about national issues affecting disaster relief efforts.</p>";
            break;
        case "precautions":
            content = "<h2>Precautions</h2><p>Guidelines and safety measures to follow during a disaster.</p>";
            break;
        case "food-and-shelter":
            content = "<h2>Food and Shelter</h2><p>Information about food and shelter availability during disasters.</p>";
            break;
        case "emergency-tips":
            content = "<h2>Emergency Tips</h2><p>Quick survival tips in case of emergency situations.</p>";
            break;
        default:
            content = "<h3>Welcome</h3><p>Select an option from the sidebar to view more information.</p>";
    }

    contentDisplay.innerHTML = content;
    toggleSidebar(); // Close the sidebar after selection
}

// Function to handle donations
async function handleDonate() {
    const donationAmount = parseFloat(prompt("Enter donation amount:"));
    if (!isNaN(donationAmount) && donationAmount > 0) {
        try {
            const res = await fetch(`${BACKEND_URL}/api/donate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: donationAmount })
            });
            const data = await res.json();
            if (res.ok) {
                alert(`✅ Thank you for your donation of ₹${donationAmount}!`);
                await fetchAndDisplayTotalFunds(); // Update displayed total
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) {
            alert("Fetch failed: " + err.message);
        }
    } else {
        alert("Please enter a valid donation amount.");
    }
}
function estimateResponseTime(type) {
    const timeMap = {
        "Flood": "1 hours",
        "Earthquake": "1 hour",
        "Fire": "30 minutes",
        "Cyclone": "3 hours",
        "Other": "2 hours"
    };
    return timeMap[type] || "2 hours";
}

function estimateVolunteers(type) {
    const volunteerMap = {
        "Flood": 10,
        "Earthquake": 15,
        "Fire": 5,
        "Cyclone": 12,
        "Other": 8
    };
    return volunteerMap[type] || 10;
}

function determinePriority(type) {
    const priorityMap = {
        "Flood": "High",
        "Earthquake": "Critical",
        "Fire": "Medium",
        "Cyclone": "High",
        "Other": "Medium"
    };
    return priorityMap[type] || "Medium";
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayTotalFunds();
    let reportSubmitted = false;

    // Handle disaster report form
    const disasterForm = document.getElementById('disaster-form');
    const reportSuccessMessage = document.getElementById('report-success-message');

    if (disasterForm) {
        disasterForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const location = document.getElementById('location').value;
            const disasterType = document.getElementById('disaster-type').value;
            const details = document.getElementById('details').value;

            if (!location || !disasterType || !details) {
                alert("Please fill all fields in the Report Disaster form!");
                return;
            }

            if (reportSubmitted) {
                alert("You have already submitted a report. Please contact us if you need further assistance.");
                return;
            }

            try {
                const res = await fetch(`${BACKEND_URL}/api/report`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ location, disasterType, details })
                });

                const data = await res.json();

                if (res.ok) {
                    const estimatedTime = estimateResponseTime(disasterType);
                    const nearbyVolunteers = estimateVolunteers(disasterType);
                    const priority = determinePriority(disasterType);

                    alert(`✅ Report submitted successfully!
                            📍 Disaster Type: ${disasterType}
                            🕐 Estimated Response Time: ${estimatedTime}
                            👥 Volunteers Assigned: ${nearbyVolunteers}
                            🚨 Priority Level: ${priority}`);

                    reportSuccessMessage.style.display = 'block';
                    disasterForm.reset();
                    setTimeout(() => {
                        reportSuccessMessage.style.display = 'none';
                    }, 5000);
                    reportSubmitted = true;
                } else {
                    alert("Error: " + data.error);
                }
            } catch (err) {
                alert("Fetch failed: " + err.message);
            }
        });
    }

    // Handle volunteer form
    const volunteerForm = document.querySelector("#volunteer form");

    if (volunteerForm) {
        volunteerForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const skills = document.getElementById('skills').value;

            if (!name || !email || !skills) {
                alert("Please fill all fields in the Volunteer Registration form!");
                return;
            }

            try {
                const res = await fetch(`${BACKEND_URL}/api/volunteer`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, skills })
                });

                const data = await res.json();

                if (res.ok) {
                    alert(data.message);
                    volunteerForm.reset();
                } else {
                    alert("Error: " + data.error);
                }
            } catch (err) {
                alert("Fetch failed: " + err.message);
            }
        });
    }
});



