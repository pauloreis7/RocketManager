const fs = require('fs')
const data = require('./data.json')
const { graduation, age, date } = require("./utils")
const Intl = require('intl')

//create
exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
           return res.send('Please fill all fields')
        }
    }

    let {avatar_url, name, birth, type, level, services} = req.body

    birth = Date.parse(birth)
    const since = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        type,
        level,
        services,
        since,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if(err) return res.send("Write file error!")

        return res.redirect(`/teachers/${ id }`)
    })
}

//show
exports.show = function (req, res) {
    const { id } = req.params

    const findTeach = data.teachers.find(function (teacher) {
       return teacher.id == id
    })

    if (!findTeach) return res.send("Teacher not found!!")

    const teacher = {
        ...findTeach,
        level: graduation(findTeach.level),
        birth: age(findTeach.birth),
        services: findTeach.services.split(","),
        since: Intl.DateTimeFormat("pt-BR").format(findTeach.since)
    }

    return res.render("teachers/show", { teacher })
}

//edit
exports.edit = function (req, res) {
    const { id } = req.params

    const findTeach = data.teachers.find(function (teacher) {
        return teacher.id == id
    })

    if (!findTeach) return res.send('Teacher not found!!')

    const teacher = {
        ...findTeach,
        birth: date(findTeach.birth)
    }


    return res.render("teachers/edit", { teacher })
}