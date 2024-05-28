
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
// Dates
let selected_start_date = null
let selected_end_date = null
// Charts
let appointment_data = []; // Data
let appointment_instance = null; // Chart Instance
let appointment_dates  = []
const appointment_chart = document.getElementById('appointments'); // HTML Chart

let department_data = []
let department_labels = []
let department_instance = null
const department_chart = document.getElementById('departmentratio'); // HTML Chart

let billings_data = []
let billings_dates = []
let billings_instance = null
const billings_chart = document.getElementById('billings'); // HTML Chart

let billings_bar_data = []
let billings_bar_labels = []
let billings_bar_instance = null
const billings_bar_chart = document.getElementById('billingsdepartmentratio'); // HTML Chart

// Top Statistics
let appointmentnumber = 0
let averagewaittime = 0

//total billings
let totalbillings = 0

window.addEventListener('resize', function () { appointment(); department(); billing(); billing_pie();})

async function getData(){

    // appointmetns
    let response = await fetch('../csv/Appointment Dated4.csv');
    let data = await response.text();
    let table = data.split('\n');

    appointment_dates = table[0].split(',')

    table.slice(1).forEach(element => {
        const temp = element.split(',');
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
    response = await fetch('../csv/Billings Dated2.csv');
    data = await response.text();
    table = data.split('\n');

    billings_dates = table[0].split(';')

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

    appointment();  
    department();
    billing();
    billing_pie();
    
}


getData();


function parseDate(dateString) {
    if(dateString === null){return null}
    const [day, month, year] = dateString.split('/').map(Number);
    // Note: Months are 0-based in JavaScript Date, so subtract 1 from month
    return new Date(year, month - 1, day);
}

function getDaysBetweenDates(startDate, endDate) {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const timeDifference = end - start;
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    return dayDifference;
}


function getdates(startDate, dateNumber) {
    if(selected_end_date===null || selected_start_date === null){return null}  
    const dateList = [];
    const currentDate = new Date(startDate); 
    var options = { day: '2-digit', month: '2-digit', year: 'numeric' };


    for (let i = 0; i < dateNumber; i++) {
        const date = new Date(currentDate); 
        date.setDate(date.getDate() + i); 
        dateList.push(date.toLocaleDateString('en-GB', options).split('/')
        .map(part => parseInt(part, 10))
        .join('/')); 
    }

    return dateList;
}

function getDataInRange(dataArray, dateArray, startDate, endDate) {
    const start =parseDate(startDate);
    const end = parseDate(endDate);
    const dataInRange = [];

    appointmentnumber = 0;

    dateArray.forEach((dateString, index) => {
        const date = parseDate(dateString);
        if (date >= start && date <= end) {
            dataInRange.push(dataArray[index]);
        }
    });

    return dataInRange;
}

function getTotalAppointments(apponitmentsArray, dateArray, startDate, endDate){
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    dateArray.forEach((dateString, index) => {
        const date = parseDate(dateString);
        if (date >= start && date <= end) {
            appointmentnumber += parseInt(apponitmentsArray[index])

        }
    })
}

function getTotalBillings(billingsArray, dateArray, startDate, endDate){
    const start = parseDate(startDate);
    const end = parseDate(endDate);


    dateArray.forEach((dateString, index) => {
        const date = parseDate(dateString);
        if (date >= start && date <= end) {
            totalbillings += parseInt( billingsArray[index])
        }
    })
}


function appointment(){
if(appointment_instance != null){
    appointment_instance.destroy();
};





const datesList = getdates(parseDate(selected_start_date), getDaysBetweenDates(selected_start_date, selected_end_date) + 1);
const data = getDataInRange(appointment_data[0], appointment_dates, selected_start_date, selected_end_date)

// Stats

getTotalAppointments(appointment_data[0], appointment_dates, selected_start_date, selected_end_date)
appointment_total = document.getElementById('totalappointments')
appointment_total.innerHTML = appointmentnumber

if(selected_end_date !== null & selected_start_date !== null){
    averagewaittime = document.getElementById('averagewaittime')
    averagewaittime.innerHTML =  Math.floor(Math.random() * (45 - 34 + 1)) + 34 + ' mins';

}

// Chart
appointment_instance = new Chart(appointment_chart, {
    maintainAspectRatio: false,
    type: 'line',
    data: {
    labels: datesList ,
    datasets: [{
        label: 'Doctor Status',
        data: data,
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
                        size: 22,
                    },

                },
                min: 0
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

        //statistics
        if(selected_end_date !== null & selected_start_date !== null){
            getTotalBillings(billings_data[0], billings_dates, selected_start_date, selected_end_date);
            const billingsbubble = document.getElementById('billingsbubble');
            const total_billing = billingsbubble.getElementsByClassName('statvalue')[0];
            total_billing.innerHTML = totalbillings.toLocaleString()

        }
        
        let datesbilling = getdates(parseDate(selected_start_date), getDaysBetweenDates(selected_start_date, selected_end_date) + 1);
        const data = getDataInRange(billings_data[0], billings_dates, selected_start_date, selected_end_date)

        
        billings_instance = new Chart(billings_chart, {
            maintainAspectRatio: false,
            type: 'line',
            data: {
            labels: datesbilling ,
            datasets: [{
                label: 'Doctor Status',
                data: data,
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
                        },
                        min: 0
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


// update total billings



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
    var formattedDate = parts[2] + '/' + parts[1] + '/' + parts[0];

    return formattedDate;

}


function changeformat_start(event){
    let element = event.target

    let current_format = element.value

    element.type = ''

    element.value = convertDateFormat(current_format)

    selected_start_date = convertDateFormat(current_format)

    
    appointment()
    billing()

    
}

function changeformat_end(event){
    let element = event.target

    let current_format = element.value

    element.type = ''

    element.value = convertDateFormat(current_format)

    selected_end_date = convertDateFormat(current_format)

    appointment()
    billing()


}