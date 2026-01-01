const { log } = require('console');
const fs = require('fs');
const fsPromises = require('fs').promises;
let arrStudents
let arrSubjects
let arrChosenStudents
let arrGrades
let promise1 = fs.promises.readFile("students.json")
    .then(function(result) {
        result = JSON.parse(result)
        arrStudents = result
            // console.log(result)

    });
let promise2 = fs.promises.readFile("subjects.json")
    .then(function(result) {
        result = JSON.parse(result)
        arrSubjects = result
            //  console.log(result)

    })
let promise4 = fs.promises.readFile("grades.json")
    .then(function(result) {
        result = JSON.parse(result)
        arrGrades = result
            //  console.log(result)

    })

function retProm3() {

    return fs.promises.readFile("chosenStudents.json")
        .then(function(res) {
            res = JSON.parse(res)
            arrChosenStudents = res

            for (let i = 0; i < res.length; i++) {
                count = 0, sum = 0
                arrGrades.forEach(e => {
                    if (e.idStudent == res[i].id) {
                        count++
                        sum += e.grade
                    }
                });
                console.log("student id: " + res[i].id + " his total avg: " + sum / count)
            }
            console.log();
        })

}

function retProm4() {

    return fs.promises.readFile("chosenSubjects.json")
        .then(function(res) {
            res = JSON.parse(res)
            arrChosenStudents = res

            for (let i = 0; i < res.length; i++) {
                count = 0, sum = 0
                arrGrades.forEach(e => {
                    if (e.idSubject == res[i].id) {
                        count++
                        sum += e.grade
                    }
                });
                console.log("subject id: " + res[i].id + " his total avg: " + sum / count)
            }
            console.log();
        })

}
// let promise4=fs.promises.readFile("grades.json")
// .then(function(result) {
//     result = JSON.parse(result)
//     arrGrades=result
//     console.log(result)

// })


Promise.all([promise1, promise2, promise4])
    .then(() => {
        return retProm3()
    })
    .then(() => {
        retProm4()
    })



// setTimeout(() => {
//     console.log(arrStudents)
//     console.log(arrSubjects)
//     console.log(arrChosenStudents)
// }, 4000)