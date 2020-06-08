const { graduation, age, date } = require("../../lib/utils")
const Intl = require('intl')

module.exports = {

    //index
    index(req, res) {

        return res.render("teachers/index")
        
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

        let {avatar_url, name, birth, type, level, services} = req.body

        return   
    },

    //showUser
    show(req, res) {

        return 
        
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