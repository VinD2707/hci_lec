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

let billings_data = []
let billings_dates = []
let billings_instance = null
const billings_chart = document.getElementById('billings'); // HTML Chart

let billings_bar_data = []
let billings_bar_labels = []
let billings_bar_instance = null
const billings_bar_chart = document.getElementById('billingsdepartmentratio'); // HTML Chart



window.addEventListener('resize', function () { billing(); billing_bar();})


async function getData(){
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

    console.log(billings_bar_data)
    // appointment();  
    billing();
    billing_bar();
    // appointment();
}

getData();

// Dates
let selected_start_date = null
let selected_end_date = null

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

function billing(){
    if(billings_instance != null){
        billings_instance.destroy();
    };

    
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
    
                  
            
            aspectRatio: 2,
            responsive: true,
            plugins: {
                
    
            legend: {
                display: false
            },
            title:{
                display:true,
                text: "Billings",
                font:{
                size: 28
                }
            },
            
        },
       
        }
    });
    }


function billing_bar(){
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
                  
            
            aspectRatio: 1.9,
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

// billing_pie();
// appointment();

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

    
    billing_bar()
    billing()

    
}

function changeformat_end(event){
    let element = event.target

    let current_format = element.value

    element.type = ''

    element.value = convertDateFormat(current_format)

    selected_end_date = convertDateFormat(current_format)

    billing_bar()
    billing()


}



billings = document.getElementsByClassName('row')
function Search(){
    search = document.getElementById('search')

    for (var i = 0; i < billings.length; i++) {
        billingid = billings[i].getElementsByClassName('billingid')[0].textContent.toLowerCase()
        console.log(billingid)

        if(billingid.includes(search.value.toLowerCase())){
            billings[i].style.display = 'table-row'
        }else{
            billings[i].style.display = 'none'
        }
    }
}