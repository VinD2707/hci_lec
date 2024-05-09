function test(){
    window.alert("testing")
}

function mouseOverFunction() {
    window.alert("Mouse Over triggered!");
}

window.alert("javascript connected")

dropdown_elements = document.getElementsByClassName('dropdown-parent')
for (var i = 0; i < dropdown_elements.length; i++) {
    dropdown_elements[i].addEventListener('click', function(){
        var dropdown = dropdown_elements[i].getElementsByClassName('dropdown')
        dropdown.style.display = 'block'
    });
}

