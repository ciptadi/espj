const express = require('express')
const mongoose = require('./utils/db')
const session = require('express-session')
const moment = require('moment')

const app = express()
const port = process.env.PORT || 3000

const Spby = require('./models/spby')
const User = require('./models/user')

//view engine setup
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'kpumojokerto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}))

//main route
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        return res.redirect('dashboard');
    } else {
        return res.render('pages/login');
    }
})
app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, function (error, users) {
        if (error) {
            console.log(error)
            console.log('username salah')
            res.redirect('/')
        } else {
            if (users.password == req.body.password) {
                res.redirect('/dashboard')
                req.session.loggedin = true
            } else {
                console.log('password salah')
                res.redirect('/')
            }
        }
    })

})

app.get('/dashboard', async (req, res) => {
    const users = await User.find({});
    res.render('pages/dashboard', { users })
})

app.post('/user', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }, function (err, data) {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(data)
            res.redirect('/')
        }

    })

})

app.post('/user/add', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }, function (err, data) {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(data)
            res.redirect('/dashboard')
        }
    })
})

app.post('/user/edit/:id', (req, res) => {

    User.findByIdAndUpdate(req.body._id,req.body, (err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
            res.redirect('/dashboard')
        }
    })
    
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => { })

    res.render('pages/login')
})


app.listen(port)