const { db, Student, Campus } = require('./db/models');

const data = {
    campuses: [
        {
            name: 'Binghamton',
            description: 'the public ivy of the northeast'
        },

        {
            name: 'Northwestern',
            description: 'some private school near chicago'
        }
    ],

    students: [
        {
            firstName: 'Ari',
            lastName: 'Kramer',
            email: 'a@a.com',
            gpa: '3.5',
            campusId: 1
        },

        {
            firstName: 'Justin',
            lastName: 'Ivry',
            email: 'j@j.com',
            gpa: '3.3',
            campusId: 1
        },

        {
            firstName: 'Chris',
            lastName: 'Starace',
            email: 'c@a.com',
            gpa: '3.6',
            campusId: 1
        },

        {
            firstName: 'Jesse',
            lastName: 'Kramer',
            email: 'j@a.com',
            gpa: '3.5',
            campusId: 2
        }
    ]
}

db.sync({force: true})
    .then(() => {
        data.campuses.forEach(campus => {
            Campus.create(campus)
        })
    })
    .then(() => {
        data.students.forEach(student => {
            Student.create(student)
        })
    })
    .catch(err => console.error(err));