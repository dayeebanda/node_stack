const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const { bindUserWithRequest } = require('./authMiddleware')
const setLocals = require('./setLocals')


const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('config');

const MONGOOSE_URI = 'mongodb+srv://habib:emdad1234@cluster0-2pvwn.mongodb.net/exp-blog'

const store = new MongoDBStore({
    uri: MONGOOSE_URI,
    databaseName: 'exp-blog',
    collection: 'mySessions',
    expires: 100 * 60 * 60 * 2,
})

const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),

    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store,
    }),
    flash(),
    bindUserWithRequest(),
    setLocals(),


]

module.exports = app => {
    middleware.forEach(m => {

        app.use(m)
    })
}