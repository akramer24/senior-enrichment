const { db, Frat, Brother } = require('./db/models');

const data = {
    frats: [
        {
            name: 'Omega Theta Pi',
            description: 'Faber College\'s most prestigious fraternity!',
            imageUrl: 'http://everyguyed.com/wp-content/uploads/2011/01/Dress-the-Part-Animal-House-3.png'
        },

        {
            name: 'Delta Tau Chi',
            description: 'Was it over when the Germans bombed Pearl Harbor? Hell no!',
            imageUrl: 'https://pbs.twimg.com/profile_images/527950919107768321/1GIrM9JW_400x400.jpeg'
        }
    ],

    brothers: [
        {
            firstName: 'John',
            lastName: 'Blutarsky',
            nickname: 'Bluto',
            email: 'bluto@dtc.com',
            imageUrl: 'http://belushi.com/files/5814/5575/4177/john_belushi_animal_house1.jpg',
            gpa: '0.0',
            fratId: 2
        },

        {
            firstName: 'Daniel',
            lastName: 'Simpson-Day',
            nickname: 'D-Day',
            email: 'dday@dtc.com',
            imageUrl: 'https://padresteve.files.wordpress.com/2013/09/images-57.jpeg',
            gpa: null,
            fratId: 2
        },

        {
            firstName: 'Doug',
            lastName: 'Neidermeyer',
            email: 'doug@otp.com',
            imageUrl: 'http://static.tvtropes.org/pmwiki/pub/images/neidermeyer.jpg',
            gpa: '3.6',
            fratId: 1
        },

        {
            firstName: 'Kent',
            lastName: 'Dorfman',
            nickname: 'Flounder',
            email: 'j@a.com',
            imageUrl: 'https://ewedit.files.wordpress.com/2017/06/furst.jpg?w=2000',
            gpa: '0.2',
            fratId: 2
        },

        {
            firstName: 'Lawrence',
            lastName: 'Kroger',
            nickname: 'Larry',
            email: 'larry@dtc.com',
            imageUrl: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9335997/AnimalHouse_216Pyxurz.jpg',
            gpa: '1.2',
            fratId: 2
        }
    ]
}

db.sync({force: true})
    .then(() => {
        data.frats.forEach(frat => {
            Frat.create(frat)
        })
    })
    .then(() => {
        data.brothers.forEach(brother => {
            Brother.create(brother)
        })
    })
    .catch(err => console.error(err));