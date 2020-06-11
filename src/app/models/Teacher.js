const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    
    all(callback) {

        db.query(`SELECT * FROM teachers ORDER BY name DESC`, function (err, results) {
        if (err) throw `Erro ao encontrar professores! Erro: ${ err }`

            callback(results.rows)
        })
    },

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
            if (err) throw `Erro ao inserir professor! ${ err }`

            callback(results.rows[0])
        })
    },

    find(id, callback) {

        db.query(`SELECT * FROM teachers WHERE id = ${ id }`, function (err, results) {
            if (err) throw `Erro ao encontrar professores! Erro: ${ err }`
            
            callback(results.rows[0])
        })
    }
}