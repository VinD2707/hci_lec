

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

document.getElementById('doctorForm').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;

    // Perform form submission using fetch (for modern browsers)
    fetch(form.action, {
        method: form.method,
        body: new FormData(form)
    }).then(response => {
        if (response.ok) {
            // Redirect to another page upon successful submission
            window.location.href = 'your-page-url.html';
        } else {
            // Handle error
            alert('Form submission failed!');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form!');
    });
}
