const Student = require('../models/Student')
const { age, date, grade } = require('../../lib/utils')
const Intl = require('intl')
const db = require('../../config/db')

module.exports = {

    //index
    index(req, res) {

        Student.all(function (students) {
            if (!students) return res.send("Students not found!")

            
            for ( student of students) {              
                student.level = grade(student.level)
            }

            return res.render("students/index", { students })
            
        })
    },

    //createPage
    create(req, res) {

        Student.selectTeachers(function (teachers) {
            if (!teachers) return res.send("Teachers not found!")
            
            return res.render("students/create", { teachers })
        })
        

    },

    //createUser
    post(req, res) {

        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] =="") return res.send('Please fill all fields')
        }

        Student.create(req.body, function (student) {
            return res.redirect(`/students/${ student.id }`)
        })
    },

    //showData
    show(req, res) {

        Student.find(req.params.id, function (student) {
            if (!student) return res.send("Student not found!")

            student.birth = date(student.birth).birthDate
            student.level = grade(student.level)
            student.created_at = date(student.created_at).format

            return res.render("students/show", { student })
        })

    },

    //editPage
    edit(req, res) {

        Student.find(req.params.id, function (student) {
            if (!student) return res.send("Student not found!")

            student.birth = date(student.birth).iso

            Student.selectTeachers(function (teachers) {
                if (!teachers) return res.send("Teachers not found!")
                
                return res.render("students/edit", { student, teachers })
            })

        })

    },

    //editUser
    put(req, res) {

        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] =="") {
                return res.send('Please fill all fields')
            }
        }

        Student.update(req.body, function () {
            
            return res.redirect(`/students/${ req.body.id }`)
        })

    },

    //deleteUser
    delete(req, res) {

        Student.delete(req.body.id, function () {
            
            return res.redirect("/students")
        })
    },
}