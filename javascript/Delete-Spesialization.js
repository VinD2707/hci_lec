document.querySelectorAll('.dropdown-head').forEach(function(head) {
    head.addEventListener('click', function() {
        // Remove the 'active' class from all other dropdowns
        document.querySelectorAll('.dropdown-head').forEach(function(item) {
            if (item !== head) {
                item.classList.remove('active');
                item.nextElementSibling.style.display = 'none';
            }
        });

        // Toggle the 'active' class on the clicked head
        this.classList.toggle('active');
        const dropdown = this.nextElementSibling;
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
});

function validateForm(event) {
    event.preventDefault(); // To prevent reset the forms
    const password = document.getElementById('password').value;

    if (password === '') {
        alert('Password cannot be empty!');
        return;
    }
    
    
    const confirmUser = confirm("Are you sure you want to submit?")
    if(confirmUser == false){
        return;
    }

    const deleteForm = document.getElementById('delete-form')

    setTimeout(() => {
        alert("Your data has been successfully deleted.");
        deleteForm.submit();
        window.location.href = 'Spesialization.html';
    }, 100); // Delay to ensure the alert is shown after the form is processed
    
}

document.getElementById('delete-form').addEventListener('submit', validateForm);