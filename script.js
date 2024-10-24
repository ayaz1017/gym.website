function showSection(sectionId) {
    // Hide all content sections
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => section.classList.remove('active'));

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
}

function registerCustomer(event) {
    event.preventDefault();

    // Collect customer data
    const custName = document.getElementById('custName').value;
    const custAge = document.getElementById('custAge').value;
    const custPhone = document.getElementById('custPhone').value;
    const custEmail = document.getElementById('custEmail').value;

    // Create a new row for the table
    const customerTableBody = document.getElementById('customerTableBody');
    const newRow = customerTableBody.insertRow();

    newRow.innerHTML = `
        <td>${custName}</td>
        <td>${custAge}</td>
        <td>${custPhone}</td>
        <td>${custEmail}</td>
    `;

    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = "Customer registered successfully!";
    successMessage.style.display = 'block';

    // Clear the form
    document.getElementById('customerForm').reset();

    // Hide success message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

