const express = require('express')
const mongoose = require('./utils/db')
const session = require("express-session")
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

//check login session
function checkUserSession(req, res, next) {
    if (req.session.loggedin) {
        next();
    } else {
        res.redirect('/');
    }
};

//main route
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        return res.redirect('dashboard');
    } else {
        return res.render('pages/login');
    }
})
app.post('/login', (req, res) => {
    User.findOne({username:req.body.username}, function(error, users){
        if(error){
            console.log(error)
            console.log('username salah')
            res.redirect('/')
        }else{
            if(users.password==req.body.password){
                res.render('pages/dashboard')
                req.session.loggedin = true
            }else{
                console.log('password salah')
                res.redirect('/')
            }
        }
    })
    
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

app.get('/logout', (req, res) => {
    req.session.loggedin = false
    res.render('pages/login')
})


app.listen(port)