const fs = require('fs').promises;
let students;
let selectedStudents;
let subjects;
let grades;

async function main() {

    try {
        const [studentsData, subjectsData] = await Promise.all([
            loadStudents(),
            loadSubjects()
        ])
        students = studentsData;
        subjects = subjectsData;
        selectedStudents = await loadSelectedStudents();
        grades = await loadGrades();


        console.log("\nציונים ממוצעים לתלמידים נבחרים:");
        selectedStudents.forEach(studentId => {
       
            const student = students.find(s => s.id === studentId);
            console.log(`\nתלמיד: ${student.name}`);

            subjects.forEach(subject => {
                const studentGrades = grades.filter(g =>
                    g.studentId === studentId && g.subjectId === subject.id
                );

                if (studentGrades.length > 0) {
                    const average = studentGrades.reduce((sum, g) => sum + g.grade, 0) / studentGrades.length;
                    console.log(`${subject.name}: ${average.toFixed(1)}`);
                }
            });
        });

        console.log("\nציונים ממוצעים לפי מקצועות:");
        subjects.forEach(subject => {
            const subjectGrades = grades.filter(g => g.subjectId === subject.id);
            if (subjectGrades.length > 0) {
                const average = subjectGrades.reduce((sum, g) => sum + g.grade, 0) / subjectGrades.length;
                console.log(`${subject.name}: ${average.toFixed(1)}`);
            }
        });


        //======  

        console.log("👍🏻success");
    } catch (error) { console.error(error); }
}

main();
async function loadStudents() {
    try {
        const students = await fs.readFile('students.json', 'utf-8');
        const studentsNew = JSON.parse(students);
        return studentsNew.students;
    } catch (error) {
        console.error("Error loading students:", error);
        throw error;
    }

}
async function loadSelectedStudents() {
    try {
        const selectedStudents = await fs.readFile('selectedStudents.json', 'utf-8');
        const selectedStudentsNew = JSON.parse(selectedStudents);
        return selectedStudentsNew.selectedStudents;
    } catch (error) {
        console.error("Error loading selected students:", error);
        throw error;

    }
}
async function loadSubjects() {
    try {
        const subjects = await fs.readFile('subjects.json', 'utf-8');
        const subjectsNew = JSON.parse(subjects);
        return subjectsNew.subjects;
    } catch (error) {
        console.error("Error loading subjects:", error);
        throw error;

    }
}
async function loadGrades() {
    try {
        const grades = await fs.readFile('grades.json', 'utf-8');
        const gradesNew = JSON.parse(grades);
        return gradesNew.grades;
    } catch (error) {
        console.error("Error loading grades:", error);
        throw error;

    }
}

