const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')



//Import Routes
const authRoutes = require('./routes/authRoute')



const app = express()


// setup view Engine

app.set('view engine', 'ejs');

app.set('views', 'views')

// middelaware Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()

]


app.use(middleware)

app.use('/auth', authRoutes)


app.get('/', (req, res) => {

    //res.render('pages/auth/signup', { title: 'Create a New Account' })


    res.json({
        message: "hello Bangladesh"
    })
})

const PORT = process.env.PORT || 8080;

mongoose
    .connect('mongodb+srv://habib:emdad1234@cluster0-2pvwn.mongodb.net/exp-blog?retryWrites=true&w=majority', { useNewUrlParser: true })

.then(() => {
    console.log('Database Connected')
    app.listen(PORT, () => {

        console.log('server is running on  PORT' + PORT)
    })

})

.catch(e => {

    return console.log(e)
});