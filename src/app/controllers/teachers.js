const { graduation, age, date } = require("../../lib/utils")
const Teacher = require('../models/Teacher')
const Intl = require('intl')

module.exports = {

    //index
    index(req, res) {

        let { search, page, limit } = req.query

        page = page || 1
        limit = limit || 3

        let offset = limit * (page - 1)

        const params = {
            search,
            limit,
            offset,
            callback (teachers) {

                for ( teacher of teachers) {
                    teacher.subjects_taught = teacher.subjects_taught.split(",")
                }

                const paginationData = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }

                return res.render("teachers/index", { teachers, paginationData, search })
            }
        }

        Teacher.paginate(params)
    },

    //createPage
    create(req, res) {

        return res.render("teachers/create")
        
    },

    //createUser
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") return res.send('Please fill all fields')
        }

        Teacher.create(req.body, function (teacher) {
            return res.redirect(`/teachers/${ teacher.id }`)
        })
    },

    //showUser
    show(req, res) {

        Teacher.find(req.params.id, function (teacher) {
            if (!teacher) return res.send("Teacher not found!")

                teacher.birth_date = age(teacher.birth_date)
                teacher.education_level = graduation(teacher.education_level)
                teacher.class_type = teacher.class_type.charAt(0).toUpperCase() + teacher.class_type.slice(1)
                teacher.subjects_taught = teacher.subjects_taught.split(",")
                teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", { teacher })
        }) 
        
    },

    //editPage
    edit(req, res) {

        Teacher.find(req.params.id, function (teacher) {
            if (!teacher) return res.send("Teacher not found!")

            teacher.birth_date = date(teacher.birth_date).iso

            return res.render("teachers/edit", { teacher })
        })

    },

    //editUser
    put(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") return res.send('Please fill all fields')
        }
        
        Teacher.update(req.body, function () {
            
            return res.redirect(`/teachers/${ req.body.id }`)
        })
    },

    //deleteUser
    delete(req, res) {

        Teacher.delete(req.body.id, function () {
            
            return res.redirect("/teachers")
        })
    },
}