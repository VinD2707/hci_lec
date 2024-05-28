
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
let appointment_data = []; // Data
let appointment_instance = null; // Chart Instance
const appointment_chart = document.getElementById('appointments'); // HTML Chart

let department_data = []
let department_labels = []
let department_instance = null
const department_chart = document.getElementById('departmentratio'); // HTML Chart

let billings_data = []
let billings_labels = []
let billings_instance = null
const billings_chart = document.getElementById('billings'); // HTML Chart

let billings_bar_data = []
let billings_bar_labels = []
let billings_bar_instance = null
const billings_bar_chart = document.getElementById('billingsdepartmentratio'); // HTML Chart

window.addEventListener('resize', function () { appointment(); department(); billing(); billing_pie();})

async function getData(){

    // appointmetns
    let response = await fetch('../csv/Appointments.csv');
    let data = await response.text();
    let table = data.split('\n').slice(1);

    table.forEach(element => {
        const temp = element.split(';');
        appointment_data.push(temp);
    })

    // appointment per departments
    response = await fetch('../csv/Appointment-Departments.csv');
    data = await response.text();
    table = data.split('\n');

    department_labels = table[0].split(';')

    table.slice(1).forEach(element => {
        const temp = element.split(';');

        department_data.push(temp);
    })

    // billing
    response = await fetch('../csv/Billings.csv');
    data = await response.text();
    table = data.split('\n');

    billings_labels = table[0].split(';')

    table.slice(1).forEach(element => {
        const temp = element.split(';');

        billings_data.push(temp);
    })

    // billing per department

    response = await fetch('../csv/Billing-Departments.csv');
    data = await response.text();
    table = data.split('\n');

    billings_bar_labels = table[0].split(';')

    table.slice(1).forEach(element => {
        const temp = element.split(';');

        billings_bar_data.push(temp);
    })

    console.log(billings_bar_data)
    appointment();  
    department();
    billing();
    billing_pie();
    
}


// Initialize Window

window.addEventListener('load', async function() {

    // Get the Data
    await getData();

    // Calculate Billings Amount Update Visualization
    const billingsbubble = document.getElementById('billingsbubble');
    const total_billing = billingsbubble.getElementsByClassName('statvalue')[0];
    let temp = 0
    if (typeof billings_bar_data !== 'undefined' && billings_bar_data.length > 0) {
        let data = billings_bar_data[0]

        for(i = 0; i < data.length; i++){
                temp += parseInt(data[i])
        }
    }
    

    total_billing.innerHTML = temp.toLocaleString()

})





function getdates(startDate, dateNumber) {
    const dateList = [];
    const currentDate = new Date(startDate); 

    for (let i = 0; i < dateNumber; i++) {
        const date = new Date(currentDate); 
        date.setDate(date.getDate() + i); 
        dateList.push(date.toLocaleDateString()); 
    }

    return dateList;
}



function appointment(){
if(appointment_instance != null){
    appointment_instance.destroy();
};


const startDate = new Date('2024-05-24');
const datesList = getdates(startDate, (appointment_data[0].length));

appointment_instance = new Chart(appointment_chart, {
    maintainAspectRatio: false,
    type: 'line',
    data: {
    labels: datesList ,
    datasets: [{
        label: 'Doctor Status',
        data: appointment_data[0],
        backgroundColor: 'rgb(0,0,0)',
        borderWidth: 3,
        
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
    },
    
    options: {
        scales: {
            x: {
                ticks: {
                    maxRotation: 30, 
                    minRotation: 30,
                    font: {
                        size: 22
                        
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 22
                        
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
            // text: "Doctors in Each Department",
            font:{
            size: 28
            }
        },
        
    },
   
    }
});
}

function department(){
    if(department_instance != null){
        department_instance.destroy();
    };
    

    
    department_instance = new Chart(department_chart, {
        maintainAspectRatio: false,
        type: 'pie',
   

        data: {
        
        labels: department_labels,

        datasets: [{
            data: department_data[0],
            borderWidth: 2,
            backgroundColor: ['#55efc4', "#81ecec", "#74b9ff"],
            borderColor: 'rgb(0,0,0)',
            tension: 0.1
        }]
        },
        
        options: {
            scales: {
                x: {
                    ticks: {
                        display: false
                    },
                    grid: {
                        display: false // Hide y-axis grid lines
                     },

                     border:{
                        display:false
                     }
                },
                y: {
                    ticks: {
                        display: false
                    },
                    grid: {
                        display: false // Hide y-axis grid lines
                        },
                    border:{
                        display:false
                        }
                }
                
            },
    
                  
            
            aspectRatio: 1,
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',              
                  },

                title:{
                    display:true,
                    text: "Appointments in Each Department",
                    font:{
                    size: 22
                    }
                },
            
        },
       
        }
    });
    }



    function billing(){
        if(billings_instance != null){
            billings_instance.destroy();
        };
        
        
        const startDate = new Date('2024-05-24');
        const datesList = getdates(startDate, (billings_data[0].length));
        
        billings_instance = new Chart(billings_chart, {
            maintainAspectRatio: false,
            type: 'line',
            data: {
            labels: datesList ,
            datasets: [{
                label: 'Doctor Status',
                data: billings_data[0],
                backgroundColor: 'rgb(0,0,0)',
                borderWidth: 2,
                
                borderColor: 'rgb(0,0,0)',
                tension: 0.1
            }]
            },
            
            options: {
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 30, 
                            minRotation: 30,
                            font: {
                                size: 22
                                
                            }
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 22
                                
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
                    // text: "Doctors in Each Department",
                    font:{
                    size: 28
                    }
                },
                
            },
           
            }
        });
        }


// billing pie

function billing_pie(){
    if(billings_bar_instance != null){
        billings_bar_instance.destroy();
    };
    
    billings_bar_instance = new Chart(billings_bar_chart, {
        maintainAspectRatio: false,
        type: 'bar',
        data: {
        labels: billings_bar_labels,
        datasets: [{
            label: 'Doctor Status',
            data: billings_bar_data[0],
            borderWidth: 2,
            borderColor: 'rgb(0,0,0)',
            backgroundColor: ['#55efc4', "#81ecec", "#74b9ff"]
        }]
        },
        
        options: {
    
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 22
                            
                        },
                    }
                },

                y: {
                    ticks: {
                        font: {
                            size: 20
                            
                        }
                    }
                }
                
            },
                  
            
            aspectRatio: 1.3,
            responsive: true,
            plugins: {
    
            legend: {
                display: false
            },
            title:{
                display:true,
                text: "     Billings From Each Department",
                font:{
                size: 22
                }
            },
            
        },
       
        }
    });
    }
    


    // Table Status Update 


window.addEventListener('load', function() {

    let tablestatus = document.getElementsByClassName('tablestatus')

    for(i = 0; i < tablestatus.length; i++){
            const status = tablestatus[i].innerHTML.trim()

            if(status === 'Done'){
                tablestatus[i].style.backgroundColor = '#EBF9F1'
                tablestatus[i].style.color = '#1F9254';
            }
            else if(status === 'Pending'){
                tablestatus[i].style.backgroundColor = '#FEF2E5'
                tablestatus[i].style.color = '#CD6200';
            }
            else if(status === 'Cancelled'){
                tablestatus[i].style.backgroundColor = '#FBE7E8'
                tablestatus[i].style.color = '#A30D11';
            }
            else{
                tablestatus[i].style.backgroundColor = 'none'
                tablestatus[i].style.color = '#7f8fa6';
                tablestatus[i].innerHTML = '?'
            }
        }
    

})



// dateinputs 



dateinputs = document.getElementsByClassName('date')

for(i=0; i< dateinputs.length; i++){
    dateinputs[i].addEventListener('focusin', function(){
        this.type = 'datetime-local'
        this.style.color = 'black'
        this.showPicker()
    })

    dateinputs[i].addEventListener('focusout', function(){
        this.type = ''
    })
}


function convertDateFormat(inputDate) {
    var parts = inputDate.split(/[T:-]/);

    // Rearrange the components to the dd/mm/yyyy format
    var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];

    console.log(parts)
    return formattedDate;

}


function changeformat(event){
    let element = event.target

    let current_format = element.value
    console.log(current_format)

    element.value = convertDateFormat(current_format)

}