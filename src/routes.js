const express = require('express')
const teachers = require('./app/controllers/teachers')
const students = require("./app/controllers/students")

const routes = express.Router()

//teachers
routes.get("/", function (req, res) {
    return res.redirect("/teachers")
})

routes.get("/teachers", teachers.index)

routes.get("/teachers/create", teachers.create)

routes.post("/teachers", teachers.post)

routes.get("/teachers/:id", teachers.show)

routes.get("/teachers/:id/edit", teachers.edit)

routes.put("/teachers", teachers.uptade)

routes.delete("/teachers", teachers.delete)

//students
routes.get("/students", students.index)

routes.get("/students/create", students.create)

routes.post("/students", students.post)

routes.get("/students/:id", students.show)

routes.get("/students/:id/edit", students.edit)

routes.put("/students", students.uptade)

routes.delete("/students", students.delete)

module.exports = routes