

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


const form = document.querySelector(".container form");
form.addEventListener('submit', saveData);

function saveData(ev){
    ev.preventDefault();
    const form = ev.target;
    const formdata = new FormData(form);
    form.reset()
    document.getElementById("name").focus();
    console.log(form);
    // console.table(Array.from(formdata.values()));
}
