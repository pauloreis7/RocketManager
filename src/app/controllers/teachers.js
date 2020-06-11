const { graduation, age, date } = require("../../lib/utils")
const Teacher = require('../models/Teacher')
const Intl = require('intl')

module.exports = {

    //index
    index(req, res) {

        Teacher.all( function (teachers) {
            if (!teachers) return res.send("Não achamos professores!")

            for ( teacher of teachers) {
                teacher.subjects_taught = teacher.subjects_taught.split(",")   
            }

            return res.render("teachers/index", { teachers })
        })

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
            if (!teacher) return res.send("Professor não encontrado!")

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

        return 
        
    },


    //editUser
    put(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") return res.send('Please fill all fields')
        }
        
        return
    },

    //deleteUser
    delete(req, res) {

        return 
        
    },
}