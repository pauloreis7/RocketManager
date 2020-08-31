const faker = require('faker')

const db = require('./src/config/db')
const Student = require('./src/app/models/Student')
const Teacher = require('./src/app/models/Teacher')

const totalTeachers = 10
const totalStudents = 5

async function createTeachers() {
  
    const teachers = []

    while (teachers.length < totalTeachers) {

        const teachs = ['highSchool', 'university', 'master', 'doctor']

        teachers.push({
            name: faker.name.firstName(),
            avatar_url: faker.image.imageUrl(),
            birth_date: faker.date.past(),
            education_level: teachs[Math.floor(Math.random() * teachs.length)],
            class_type: teachers.length > 4 ? "presential" : "distance",
            subjects_taught: faker.random.words(3),
            created_at: faker.date.recent()
        })
    }

    
    const teachersPromise = teachers.map(teacher => Teacher.create(teacher, results => results))
    await Promise.all(teachersPromise)
}

async function createStudent() {
    const levels = ['El5','El6','El7','El8','El9','Hs1','Hs2','Hs3']
    
    const results = await db.query(`SELECT id FROM teachers`)
    const teachersIds = results.rows
    
    const students = []
    
    while (students.length < totalStudents) {
        let teacherId = teachersIds[Math.floor(Math.random() * teachersIds.length)].id

        if(teachersIds.length == 1) teacherId = Math.floor(Math.random * 10)

        const student = {
            name: faker.name.firstName(),
            avatar_url: faker.image.imageUrl(),
            email: faker.internet.email(),
            birth: faker.date.past(),
            level: levels[Math.floor(Math.random() * levels.length)],
            workload: faker.random.number(99),
            teacher: teacherId,
            created_at: faker.date.recent()
        }

        students.push(student)
    }
    const studentsPromise = students.map(student => Student.create(student, results => results))
    await Promise.all(studentsPromise)
}

createTeachers().then(createStudent())