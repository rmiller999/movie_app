require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const User = require('./models/user');
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());

const loginLimiter = new RateLimit({
  windowMs: 5*60*1000,
  max: 3,
  delayMs: 0,
  message: 'Maximum login attempts exceeded!'
})
const signLimiter = new RateLimit({
  windowMs: 60*60*1000,
  max: 3,
  delayMs: 0,
  message: 'Maximum accounts created please try again later.'
})

mongoose.connect('mongodb://localhost/movie_app', {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
  console.log(`Database error:\n${err}`);
});


app.get('/users', (req,res) => {
  User.find({}, function(err,users){
    if (err) res.json(err)
    res.json(users)
  })
  
})

app.post('/users', (req,res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, function(err, user) {
    res.json(user)
  })
})

app.get('/*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
// app.use('/auth/login', loginLimiter);
// app.use('/auth/signup', signLimiter);

app.use('/auth', require('./routes/auth'));
app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));

app.listen(process.env.PORT, () => {
  console.log(`Up and running on port ${process.env.PORT}...`);
});