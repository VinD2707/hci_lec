
// Drop Down Logic
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


// Charts
let data_doctor_amount = []; // Data
let chart_instance_doctor_amount = null; // Chart Instance
const chart_doctor_amount = document.getElementById('doctor-amount'); // HTML Chart

window.addEventListener('resize', function () { doctor_amount() })

async function getData(){
    const response = await fetch('../csv/Doctor amount.csv');
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
    labels: ['THT', 'Anak', 'Gigi'],
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
            text: "Doctors in Each Department",
            font:{
            size: 20
            }
        },
        
    },
   
    }
});
}


// Data Display
let Doctor_data = [];

async function getDoctorData(){
    const response = await fetch('../csv/Doctors List.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);

    table.forEach(element => {
        const temp = element.split(';');
        Doctor_data.push(temp);
    })
    
}

let doctorTable = document.getElementById("body-table");


async function addDoctor(){
    await getDoctorData();
    console.log(Doctor_data);

    let doctor = document.createElement('tr')
    doctorTable.appendChild(doctor);

    for(var i = 0; i < Doctor_data[0].length; i++){
        let column = document.createElement('td');
        column.innerHTML = Doctor_data[0][i];
        doctor.appendChild(column);
    }
}
