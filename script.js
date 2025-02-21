// Citizenship form submission
document.getElementById("citizenshipForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const reason = document.getElementById("reason").value;

    const application = {
        fullName,
        age,
        email,
        reason,
        date: new Date().toLocaleString()
    };

    // Save application to local storage
    let applications = JSON.parse(localStorage.getItem("citizenshipApplications")) || [];
    applications.push(application);
    localStorage.setItem("citizenshipApplications", JSON.stringify(applications));

    // Show success message and clear form
    document.getElementById("responseMessage").innerText = "Thank you for applying! Your request has been received.";
    document.getElementById("responseMessage").style.display = "block";
    document.getElementById("citizenshipForm").reset();
});

// Show password prompt for admin panel
function showPasswordPrompt() {
    const password = prompt("Enter the admin password to access applications:");
    if (password === "170158") {
        showAdminPanel();
    } else {
        alert("Incorrect password. Access denied.");
    }
}

// Show the admin panel with applications
function showAdminPanel() {
    const applications = JSON.parse(localStorage.getItem("citizenshipApplications")) || [];
    const list = document.getElementById("applicationsList");
    list.innerHTML = "";

    if (applications.length === 0) {
        list.innerHTML = "<p>No applications available.</p>";
    } else {
        applications.forEach((app, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>Application #${index + 1}</strong><br>
                <strong>Name:</strong> ${app.fullName}<br>
                <strong>Age:</strong> ${app.age}<br>
                <strong>Email:</strong> ${app.email}<br>
                <strong>Reason:</strong> ${app.reason}<br>
                <strong>Submitted:</strong> ${app.date}<br>
                <button onclick="deleteApplication(${index})">Delete</button>
                <hr>
            `;
            list.appendChild(listItem);
        });
    }

    document.getElementById("adminPanel").style.display = "block";
}

// Hide admin panel
function hideAdminPanel() {
    document.getElementById("adminPanel").style.display = "none";
}

// Delete an application
function deleteApplication(index) {
    let applications = JSON.parse(localStorage.getItem("citizenshipApplications")) || [];
    applications.splice(index, 1);
    localStorage.setItem("citizenshipApplications", JSON.stringify(applications));
    showAdminPanel(); // Refresh the panel
}
