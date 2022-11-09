// Your code here
const createEmployeeRecord = (employeeArray) => {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

const createEmployeeRecords = (employeesArray) => {
    return employeesArray.map(rec => createEmployeeRecord(rec))
}

function createTimeInEvent(empRecordObj, startTime){
    let obj = {
        type: "TimeIn",
        hour: parseInt(startTime.slice(-4)),
        date: startTime.slice(0, 10)
    }
    empRecordObj.timeInEvents.push(obj)
    return empRecordObj
}

function createTimeOutEvent(empRecordObj, endTime){
    let obj = {
        type: "TimeOut",
        hour: parseInt(endTime.slice(-4)),
        date: endTime.slice(0, 10)
    }
    empRecordObj.timeOutEvents.push(obj)
    return empRecordObj
}


function hoursWorkedOnDate(empRecordObj, workDate){
    const dayStart = empRecordObj.timeInEvents.find(dayStart => dayStart.date === workDate)
    const dayEnd = empRecordObj.timeOutEvents.find(dayEnd => dayEnd.date === workDate)
    const hoursWorked = (dayEnd.hour - dayStart.hour)/100
    return hoursWorked
    // console.log('this person worked ' + hoursWorked + ' hours today')
}

function wagesEarnedOnDate(empRecordObj, workDate){
    return hoursWorkedOnDate(empRecordObj, workDate) * empRecordObj.payPerHour
}

function allWagesFor(empRecordObj){
    let allDates = [];
    let allPay = [];

    for(let i = 0; i < empRecordObj.timeInEvents.length; i++){
        allDates.push(empRecordObj.timeInEvents[i].date)
    }
    
    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(empRecordObj, date))
    })

    // console.log('this is the contents of allPay: ', allPay)
    return allPay.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);

}
function calculatePayroll(arrOfEmpRecords) {
    return arrOfEmpRecords.reduce((total, rec) => {
        return total + allWagesFor(rec)
    }, 0);

}
