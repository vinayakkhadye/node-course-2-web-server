const express   = require('express');
const hbs       = require('hbs');
const fs        = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.path} \n`;
    fs.appendFile('server.log',log,(err)=>{
        if(err){
            console.log("unable to write to log file");
        }
    })
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintainance');
// });

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home page',
        welcomeMessage:'welcome to my brand new web site'
    });
});

app.get('/about',(req, res)=>{
    res.render('about.hbs',{
        pageTitle:'About Us'
    });
});

app.use((req,res,next)=>{
    res.render('bad.hbs',{
        pageTitle:'404 NOT FOUND', 
        errorMessage:'could not fullfill request'
    });
});

app.listen(3000,()=>{
    console.log("server is up and running");
});

