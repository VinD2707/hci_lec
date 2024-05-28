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

let billings_bar_data = []
let billings_bar_labels = []
let billings_bar_instance = null    
const billings_bar_chart = document.getElementById('billingsdepartmentratio'); // HTML Chart

window.addEventListener('resize', function () { appointment(); billing_pie();})


async function getData(){
    // appointmetns
    let response = await fetch('../csv/Appointments.csv');
    let data = await response.text();
    let table = data.split('\n').slice(1);

    table.slice(1).forEach(element => {
        const temp = element.split(';');
        appointment_data.push(temp);
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
    // appointment();  
    billing_pie();
    appointment();
}

getData();

function appointment(){
    if(appointment_instance != null){
        appointment_instance.destroy();
    };

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

billing_pie();
appointment();

// GUA GATAU CARA PAKE YANG DIATAS JADINYA GUA PAKE YANG INI


// var ctx = document.getElementById('billingsdepartmentratio').getContext('2d');
//                         var myChart = new Chart(ctx, {
//                             // maintainAspectRatio: false,
//                             type: 'bar',
//                             data: {
//                                 labels: ['THT', 'Anak', 'Gigi'],
//                                 datasets: [{
//                                     label: 'Amount per Department',
//                                     data: [200,240,240],
//                                     borderWidth: 2,
//                                     borderColor: 'rgb(0,0,0)',
//                                     backgroundColor: ['#55efc4', "#81ecec", "#74b9ff"]
//                                 }]
//                             },
//                             // options: {
//                             //     scales: {
//                             //         y: {
//                             //             beginAtZero: true
//                             //         }
//                             //     }
//                             // }
//                             options: {
    
//                                 scales: {
//                                     x: {
//                                         ticks: {
//                                             font: {
//                                                 size: 22
                                                
//                                             },
//                                         }
//                                     },
                    
//                                     y: {
//                                         ticks: {
//                                             font: {
//                                                 size: 20
                                                
//                                             }
//                                         }
//                                     }
                                    
//                                 },
                                      
                                
//                                 aspectRatio: 1.3,
//                                 responsive: true,
//                                 plugins: {
                        
//                                 legend: {
//                                     display: false
//                                 },
//                                 title:{
//                                     display:true,
//                                     text: "Amount per Department",
//                                     font:{
//                                     size: 22
//                                     }
//                                 },
                                
//                             },
                           
//                             }



//                         });