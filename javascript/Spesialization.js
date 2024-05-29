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