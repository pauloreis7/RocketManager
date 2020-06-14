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
                created_at,
                teacher_id 
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.level,
            data.workload,
            date(Date.now()).iso,
            data.teacher
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Error to insert student! ${ err }`
            
            callback(results.rows[0])
        })
    },

    find(id, callback) {

        db.query(`SELECT students.*, teachers.name AS teacher_name
        FROM students 
        LEFT JOIN teachers ON (students.teacher_id = teachers.id)
        WHERE students.id = ${ id }
        `
        , function (err, results) {
            if (err) throw `Error to find student! ${ err }`
            
            callback(results.rows[0])
        })
    },

    selectTeachers(callback) {

        db.query(`SELECT name, id FROM teachers`, function (err, results) {
            if (err) throw `Error to search teachers! ${ err }`
            
            callback(results.rows)
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
            workload = ($6),
            teacher_id = ($7)
            WHERE id = ${ data.id }
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.birth,
            data.level,
            data.workload,
            data.teacher
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