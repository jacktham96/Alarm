// Variable
let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
let weekName = ["Sunday" , "Monday" , "Tuesday","Wednesday" , "Thursday" , "Friday" , "Saturday"];

// Selector
const date = document.getElementById("date");
const time = document.getElementById("time");
const alarmNum = document.querySelector(".alarm-time");
const addBtn = document.querySelector(".alarm-btn");
const alarmList = document.querySelector(".alarm-list");
const audio = document.getElementById('audio');


// Event Listener
addBtn.addEventListener('click', newAlarm);
alarmList.addEventListener('click', deleteBtn)



function updateTime() {
    var today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    let session = "" ;

    if (hour > 12) {
        session = "PM"
    }else {
        session = "AM"
    }

      // Prepending 0 if less than 10
    hour = hour > 10 ? hour : "0" + hour; // ?. = optional
    min = min > 10 ? min : "0" + min;
    sec = sec > 10 ? sec : "0" + sec;

    //DOM
    time.innerHTML = hour + " : " + min + " : " + sec + " " + session; 
    date.innerHTML = weekName[today.getDay()] + ", " + monthNames[today.getMonth()] + " " + today.getDate() + " " + today.getFullYear() ;

    currentTime = hour + ":" + min;
    getAlarmList = JSON.parse(localStorage.getItem('alarms'))

    getAlarmList.forEach(function(list){
        if(list === currentTime){
            audio.play();
            audio.loop = true;
        }
    })
    
}


// Create New Alarm
function newAlarm(e) {

    // prevent refresh
    e.preventDefault();

    // Create List Item (li)
    let listItem = document.createElement("li");
    listItem.classList.add('list-item');
    const newLabel = document.createElement("label");
    listItem.appendChild(newLabel);
    newLabel.innerText = alarmNum.value;

    // Add todo to localstorage
    saveLocalStorage(alarmNum.value);

    // Create Delete Btn
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class='bx bx-trash' ></i>`;
    deleteBtn.classList.add("thrash-btn");

    //Each element needs appending
    alarmList.appendChild(listItem);
    listItem.appendChild(deleteBtn);
    

    alarmNum.value = '' ;
}

// Delete Btn
function deleteBtn(e) {
    const item = e.target;
    console.log(item);
    // Delete TODO
    if (item.classList[0] === "thrash-btn") {
        const listItem = item.parentNode;
        listItem.remove();
        removeLocalStorage(listItem);
        audio.pause()
        

    }
}


// Save Local Storage

function saveLocalStorage(alarmValue) {
    //Check thing in storage
    let alarms;
    if (localStorage.getItem('alarms') === null) {
        alarms = []
    } else {
        alarms = JSON.parse(localStorage.getItem('alarms'))
    }
    alarms.push(alarmValue);
    localStorage.setItem("alarms", JSON.stringify(alarms)); 
}

// Remove from local storage
function removeLocalStorage(alarmValue) {
    let alarms;
    if (localStorage.getItem('alarms') === null) {
        alarms = []
    } else {
        alarms = JSON.parse(localStorage.getItem('alarms'))
    }

    const alarmIndex = alarmValue.children[0].innerText;
    alarms.splice(alarms.indexOf(alarmIndex),1);
    localStorage.setItem("alarms",JSON.stringify(alarms))

}

// Get Local Storage
window.onload = function getLocalStorage() {
    let alarms;
    if (localStorage.getItem('alarms') === null) {
        alarms = []
    } else {
        alarms = JSON.parse(localStorage.getItem('alarms'))
    }

    alarms.forEach(function(alarmNum) {
        // Create List Item (li)
        let listItem = document.createElement("li");
        listItem.classList.add('list-item');
        const newLabel = document.createElement("label");
        listItem.appendChild(newLabel);
        newLabel.innerText = alarmNum;
        console.log(alarmNum);

        // Create Delete Btn
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `<i class='bx bx-trash' ></i>`;
        deleteBtn.classList.add("thrash-btn");

        //Each element needs appending
        alarmList.appendChild(listItem);
        listItem.appendChild(deleteBtn);

        alarmNum.value = '' ;

        let alarmDate = new Date();
        if (alarmDate === alarmNum) {
            
        }

    })

}








//window.onload = function(){ //when window loads check the local storage for saved alarms and recreate them
//    activeAlarms = localStorage.length;
//    for (let i=0; i<localStorage.length; i++){
//      const alarm = JSON.parse(localStorage.getItem(localStorage.key(i)));
//    }
//  }


setInterval(updateTime , 1000) ;










