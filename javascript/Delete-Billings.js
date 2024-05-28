function validateForm(event) {
    event.preventDefault(); // To prevent reset the forms
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    const reason = document.getElementById('Reason').value;

    if (username === '' || password === '') {
        alert('Username or password cannot be empty!');
        return;
    }
    
    if(reason === ''){
        alert('Reason cannot be empty!')
        return;
    }

    if (username !== 'admin' || password !== 'admin') {
        alert('Username or password wrong!');
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
        window.location.href = 'Billings.html';
    }, 100); // Delay to ensure the alert is shown after the form is processed
    
}

document.getElementById('delete-form').addEventListener('submit', validateForm);
