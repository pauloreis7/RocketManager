module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth

        if ( month < 0 || month == 0 && today.getDate() < birthDate.getDate() ) {
            age = age -1
        }

        return age
    },

    graduation(level) {
        const teachs = {
            highSchool: "High school", 
            university: "University", 
            master: "Master", 
            doctor:"Doctor",
        }
    
        return String(teachs[level])
    },

    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            iso: `${year}-${month}-${day}`,
            birthDate: `${day}/${month}`
        }
    },

    grade(level) {

        teachs = {
            El5: "5° Elementary School",
            El6: "6° Elementary School",
            El7: "7° Elementary School",
            El8: "8° Elementary School",
            El9: "9° Elementary School",
            Hs1: "1° High School",
            Hs2: "2° High School",
            Hs3: "3° High School",
        }
        
        return String(teachs[level])
    }
}