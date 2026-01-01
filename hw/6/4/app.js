
// import { promises } from 'fs'
const promises = require('fs/promises');

let students = [];
let grades = [];
let professions = [];
let selectedProfessions = [];
let selectedStudents = [];

const { readFile } = promises;

let studPromise = readFile('./students.json')
    .then((result) => {
        console.log('in then 1');
        students = JSON.parse(result);
    })
    .catch((error) => {
        console.log("in catch " + error);
    })


let profPromise = promises.readFile('./professions.json')
    .then((result) => {
        console.log('in then 2');
        professions = JSON.parse(result);
    })
    .catch((error) => {
        console.log("in catch " + error);
    })



let gradesPromise = promises.readFile('./grades.json')
    .then((result) => {
        console.log('in then 3')
        grades = JSON.parse(result);
    })
    .catch((error) => {
        console.log("in catch " + error);
    })


const getSelectedProfessions = () => {

    promises.readFile('./selectedProfessions.json')
        .then((result) => {
            selectedStudents = JSON.parse(result);
        })
        .catch((error) => {
            console.log("in catch " + error);
        })

}

const gradesAvgOfStud = () => {
    let count = 0, sum = 0;
    students.forEach(s => {
        grades.forEach(g => {
            if (s.studentId === g.studentId) {
                count++;
                sum += g.grade;
            }
        });
        if (count != 0)
            console.log(`${s.studentName}: avg grades: ${sum / count}`);
        count=0;
        sum=0;
    });
}

const gradesAvgOfperf = () => {
    let count = 0, sum = 0;
    selectedProfessions.forEach(s => {
        grades.forEach(g => {
            if (s.professionId === g.studentId) {
                count++;
                sum += g.grade;
            }
        });
        if (count == 0)
            console.log(`${s.professionName}: avg grades: ${sum / count}`);
        count=0;
        sum=0;
    });
}




const getSelectedStudents = () => {

    return promises.readFile('./selectedStudents.json')
        .then((result) => {
            selectedStudents = JSON.parse(result);
            console.log('selected studens: ', selectedStudents);
            return selectedStudents;
        })
        .catch((error) => {
            console.log("in catch " + error);
        })

}

const getPromises = () => {
    Promise.all([studPromise, profPromise, gradesPromise])
        .then(() => {
            return promises.readFile('./selectedStudents.json');
            // .then((result) => {
            //     selectedStudents = JSON.parse(result);
            //     console.log('selected studens: ', selectedStudents);
            //     return selectedStudents;
            // })
            // .catch((error) => {
            //     console.log("in catch " + error);
            // });
        })
        .then((data) => {
            selectedStudents = JSON.parse(data);
            console.log('data: ', data)
            console.log("4 promises finished", selectedStudents);
            gradesAvgOfStud();
            return getSelectedProfessions();
        }).then(() => {
            console.log("(: after all :)");
            gradesAvgOfperf();
        }).catch(error => {
            console.log('in catch ', error)
        })
}


getPromises();


