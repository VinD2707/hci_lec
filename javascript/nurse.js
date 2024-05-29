

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

let data_doctor_amount = [];
let chart_instance_doctor_amount = null;
const chart_doctor_amount = document.getElementById('doctor-amount');

window.addEventListener('resize', function () { doctor_amount() })

async function getData(){
    const response = await fetch('../csv/Nurse Amount.csv');
    const data = await response.text();
    const table = data.split('\r\n').slice(1);

    table.forEach(element => {
        const temp = element.split(';');
        data_doctor_amount.push(temp);
    })
    doctor_amount();
}


getData();


function doctor_amount(){
if(chart_instance_doctor_amount != null){
    chart_instance_doctor_amount.destroy();
};

chart_instance_doctor_amount = new Chart(chart_doctor_amount, {
    maintainAspectRatio: false,
    type: 'bar',
    data: {
    labels: ['Nerve', 'Pediacitrian', 'Orthopedic'],
    datasets: [{
        label: 'Doctor Status',
        data: data_doctor_amount[0],
        borderWidth: 1,
        backgroundColor: ['#0984e3', "#000", "#55efc4"]
    }]
    },
    
    options: {

        scales: {
            x: {
                ticks: {
                    font: {
                        size: 18
                        
                    }
                }
            }
            
        },
              
        
        aspectRatio: 2.7,
        responsive: true,
        plugins: {

        legend: {
            display: false
        },
        title:{
            display:true,
            text: "Nurses in Each Department",
            font:{
            size: 20
            }
        },
        
    },
   
    }
});
}



//searchh

function Search() {
    var cari = document.getElementById('search').value.toLowerCase();
    var nurse = document.getElementsByClassName('row');

    for (var i = 0; i < nurse.length; i++) {
        var doctor_name = nurse[i].getElementsByClassName('doctor-name')[0].textContent.toLowerCase();
        console.log(cari);

        if (doctor_name.includes(cari)) {
            nurse[i].style.display = 'table-row';
        } else {
            nurse[i].style.display = 'none';
        }
    }
}