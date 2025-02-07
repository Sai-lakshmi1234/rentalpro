function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Encode the values to prevent issues with special characters
    const emailBody = ` Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AProblem: ${encodeURIComponent(message)}`;
    const mailtoLink = `mailto:thelaproluteja@gmail.com?subject=User Problem Submission&body=${emailBody}`;

    // Open the user's email client with the pre-filled email
    window.location.href = mailtoLink;
}