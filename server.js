const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}, ${req.originalUrl}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to append to server.log');
  });
  next();
});
// app.use((req,res,next) => {
//   res.render('maint.hbs')
// });
app.get('/',(req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    description: 'Welcome to the crypto world. This is a page where you can learn and interact with crypto to understand human mind.',
    //currentYear: new Date().getFullYear()
  })
});

app.get('/profile', (req, res) => {
  res.render('profile.hbs',{
   pageTitle: 'Profile Page',
   profileDesc: 'You can find the profile description of Crypto on this page'
  })
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    description: 'About Page Content'
    //currentYear: new Date().getFullYear()
  })
});
app.use(express.static(__dirname + '/public'));
app.get('/bad', (req,res) => {
  res.send({
    response: 'This is Bad request'
  })
});



app.listen(port, (req, res) => {
  console.log(`listening on port ${port}...`);
});
