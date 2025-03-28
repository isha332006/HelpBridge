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
function handleDonate() {
    const donationAmount = parseFloat(prompt("Enter donation amount:")); // Prompt user for donation
    if (!isNaN(donationAmount) && donationAmount > 0) { // Validate input
        updateFunds(donationAmount); // Update funds dynamically
        alert(`Thank you for your donation of ₹${donationAmount.toLocaleString()}!`);
    } else {
        alert("Please enter a valid donation amount."); // Show error for invalid input
    }
}

// Function to update funds
let currentFunds = 0; // Initialize current funds
function updateFunds(amount) {
    currentFunds += amount; // Add the donated amount to the current funds
    document.getElementById('fund-amount1').textContent = `₹${currentFunds.toLocaleString()}`; // Update display
}

document.addEventListener('DOMContentLoaded', () => {
    let reportSubmitted = false; // Flag to track if a report has been submitted
        
    // Handle disaster report form submission
    const disasterForm = document.getElementById('disaster-form');
    const reportSuccessMessage = document.getElementById('report-success-message');
        
    disasterForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
            
        // Validate form fields
        const location = document.getElementById('location').value;
        const disasterType = document.getElementById('disaster-type').value;
        const details = document.getElementById('details').value;
            
        if (!location || !disasterType || !details) {
            alert("Please fill all fields in the Report Disaster form!");
            return;
        }
            
        if (reportSubmitted) {
            // Display message if report has already been submitted
            alert("You have already submitted a report. Please contact us if you need further assistance.");
            return;
        }
            
        // Display success message
        reportSuccessMessage.style.display = 'block';
            
        // Clear form fields
        disasterForm.reset();
            
        // Hide success message after 5 seconds
        setTimeout(() => {
            reportSuccessMessage.style.display = 'none';
        }, 5000);
            
        // Set flag to true
        reportSubmitted = true;
    });
});
    
const volunteerForm = document.querySelector("#volunteer form");
if (volunteerForm) {
    volunteerForm.addEventListener("submit", function(event) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const skills = document.getElementById('skills').value;

    if (!name || !email || !skills) {
        alert("Please fill all fields in the Volunteer Registration form!");
        event.preventDefault();
    }
  });
}


