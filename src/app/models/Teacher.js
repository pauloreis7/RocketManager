const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    
    create(data, callback) {
        
        const query = `
            INSERT INTO teachers (
                name,
                avatar_url,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Error to insert teacher! ${ err }`

            callback(results.rows[0])
        })
    },

    find(id, callback) {

        db.query(`SELECT * FROM teachers WHERE id = ${ id }`, function (err, results) {
            if (err) throw `Error to find teacher! ${ err }`
            
            callback(results.rows[0])
        })

    },

    findBy(search, callback) {

        db.query(`SELECT teachers.*, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        WHERE teachers.name ILIKE '%${ search }%'
        OR teachers.subjects_taught ILIKE '%${ search }%'
        GROUP BY teachers.id
        ORDER BY total_students DESC`

        ,function (err, results) {
        if (err) throw `Error finding teachers! ${ err }`
            
            callback(results.rows)
        })
        
    },

    update(data, callback) {
        
        const query = `
        UPDATE teachers SET 
            name = ($1),
            avatar_url = ($2),
            birth_date = ($3),
            education_level = ($4),
            class_type = ($5),
            subjects_taught = ($6)
            WHERE id = ${ data.id }
        `

        const values = [
            data.name,
            data.avatar_url,
            data.birth_date,
            data.education_level,
            data.class_type,
            data.subjects_taught,
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Error to update teacher! ${ err }`
            
            callback()
        })
    },

    delete(id, callback) {

        db.query(`DELETE FROM teachers WHERE id = ${ id }`, function (err, results) {
            if (err) throw `Error to delete teacher! ${ err }`
            
            callback()
        })
    },

    paginate(params) {

        let { search, limit, offset, callback } = params 

        let query = "",
            querySearch = "",
            queryTotal = `(SELECT count(*) FROM teachers) AS total`

        if (search) {

            querySearch = `
            WHERE teachers.name ILIKE '%${ search }%'
            OR teachers.subjects_taught ILIKE '%${ search }%'
            `

            queryTotal = `
            (SELECT count(*) FROM teachers
                ${ querySearch }
            ) AS total`
        }

        query = `SELECT teachers.*, ${ queryTotal }, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        ${ querySearch }
        GROUP BY teachers.id
        ORDER BY total_students DESC
        LIMIT $1 OFFSET $2`

        db.query(query, [ limit, offset ], function (err, results) {
            if (err) throw `Error finding teachers! ${ err }`

            callback(results.rows)
        })
    }
}