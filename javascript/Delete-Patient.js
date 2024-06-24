
dropdown_elements = document.getElementsByClassName('dropdown-parent')
for (var i = 0; i < dropdown_elements.length; i++) {
    dropdown_class = dropdown_elements[i].getElementsByClassName('dropdown-text')[0]

    dropdown_class.addEventListener('click', function(index) {
        return function() {
            var dropdown_instance = dropdown_elements[index].getElementsByClassName('dropdown')[0];
            if (dropdown_instance.style.display === 'block') {

                dropdown_instance.style.display = 'none';
            } else {
            
                dropdown_instance.style.display = 'block';
            }
        };
    }(i)); // Immediately invoke the function with the current value of i as an argument. idk it just works

}

document.getElementById('cancel-btn').addEventListener('click', function(event) {
    window.location.href = '../html/patient.html'; 
})

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
        window.location.href = 'patient.html';
    }, 100); // Delay to ensure the alert is shown after the form is processed
    
}

document.getElementById('delete-form').addEventListener('submit', validateForm);
