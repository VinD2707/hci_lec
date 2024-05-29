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


//searchh

function Search() {
    var cari = document.getElementById('search').value.toLowerCase();
    var specialization = document.getElementsByClassName('row');

    for (var i = 0; i < specialization.length; i++) {
        var doctor_name = specialization[i].getElementsByClassName('name-sp')[0].textContent.toLowerCase();
        console.log(cari);

        if (doctor_name.includes(cari)) {
            specialization[i].style.display = 'table-row';
        } else {
            specialization[i].style.display = 'none';
        }
    }
}
