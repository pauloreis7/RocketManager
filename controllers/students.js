const fs = require('fs')
const data = require('../data.json')
const { graduation, age, date } = require("../utils")
const Intl = require('intl')

//index
exports.index = function (req, res) {
    
    for (let student of data.students) {

        student.services = String(student.services)

        student.services = student.services.split(",")
    }
    
    return res.render("students/index", { students: data.students }  )
}

//create
exports.create = function (req, res) {
    return res.render("students/create")
}

//post
exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
           return res.send('Please fill all fields')
        }
    }

    let {avatar_url, name, birth, type, level, services} = req.body

    birth = Date.parse(birth)
    const id = Number(data.students.length + 1)

    data.students.push({
        id,
        avatar_url,
        name,
        birth,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if(err) return res.send("Write file error!")

        return res.redirect(`/students/${ id }`)
    })
}

//show
exports.show = function (req, res) {
    const { id } = req.params

    const findStud = data.students.find(function (student) {
        student.services = String(student.services)
       return student.id == id
    })

    if (!findStud) return res.send("Student not found!!")

    const student = {
        ...findStud,
        level: graduation(findStud.level),
        birth: age(findStud.birth),
        services: findStud.services.split(","),
        since: Intl.DateTimeFormat("pt-BR").format(findStud.since)
    }

    return res.render("students/show", { student })
}

//edit
exports.edit = function (req, res) {
    const { id } = req.params

    const findStud = data.students.find(function (student) {
        return student.id == id
    })

    if (!findStud) return res.send('Student not found!!')

    const student = {
        ...findStud,
        birth: date(findStud.birth)
    }


    return res.render("students/edit", { student })
}

//update
exports.uptade = function (req, res) {
    const { id } = req.body
    let index = 0

    const findStud = data.students.find(function (student, foundIndex) {
        if (student.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!findStud) return res.send("Student not found")

    const student = {
        ...findStud,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!!")

        return res.redirect(`/students/${ id }`)
    })
}

//delete
exports.delete = function (req, res) {
    const { id } = req.body

    const filrteredStudent = data.students.filter(function (student) {
        return student.id != id
    })

    data.students = filrteredStudent

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!!")

        return res.redirect(`/students`)
    })
}