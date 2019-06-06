const express = require('express');;
const hbs = require('hbs')
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = (`${now}: ${req.method} ${req.url}`);

    console.log(log);
    fs.appendFile('sever.log', log + '\n', err => {
        if(err){
            console.log('Unable to append to server log.');
        }
    })
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname+ '/public'));
// req res = important !
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', text => text.toUpperCase())
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Welcome Page',
        welcomeMessage: 'Welcome to ExpressJS'

    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        link1: 'https://github.com/cobbie/react-pomodoro',
        link2: 'https://github.com/cobbie/node-weather',
        link3: 'https://github.com/cobbie/summer-robot-greetingcard'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: '404 NOT FOUND'
    });
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});
