const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    all(callback) {

        db.query(`SELECT * FROM students ORDER BY name DESC`, function (err, result) {
            if (err) throw `Error finding students! ${ err }`
            
            callback(result.rows)
        })
    },

    create(data, callback) {

        const query = `
            INSERT INTO students (
                name,
                avatar_url,
                email,
                birth,
                level,
                workload,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.level,
            data.workload,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Error to insert student! ${ err }`
            
            callback(results.rows[0])
        })
    },

    find(id, callback) {

        db.query(`SELECT * FROM students WHERE id = ${ id }`, function (err, results) {
            if (err) throw `Error to find student! ${ err }`
            
            callback(results.rows[0])
        })
    },

    update(data, callback) {
        
        const query = `
        UPDATE students SET 
            name = ($1),
            avatar_url = ($2),
            email = ($3),
            birth = ($4),
            level = ($5),
            workload = ($6)
            WHERE id = ${ data.id }
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.birth,
            data.level,
            data.workload,
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Error to update student! ${ err }`
            
            callback()
        })
    },

    delete(id, callback) {

        db.query(`DELETE FROM students WHERE id = ${ id }`, function (err, results) {
            if (err) throw `Error to delete student! ${ err }`

            callback()
        })
    }
}