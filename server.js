require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const User = require('./models/user');
const Rating = require('./models/rating');
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

app.get("/users/:uid/ratings", (req, res) => {
  User.findById(req.params.uid).populate('ratings').exec( (err, user) => {
    res.json(user.ratings);
  })
})

app.post("/users/:uid/ratings", (req,res) => {
  Rating.create({
    rating: req.body.rating,
    selectedRate: req.body.selectedRate,
    rated: req.body.rated,
    id: req.body.id
  }, (err, rating) => {
  User.findById(req.params.uid).populate('ratings').exec( (err, user) => {
    console.log("rating",rating)
    user.ratings.push(rating._id);
    user.save((err, user) => {
      res.json(user);
    });
    })
  })
});

app.delete("/users/:uid/ratings/:rid", (req,res) => {
  User.findById(req.params.uid, (err, user) => {
    user.ratings.pull(req.params.rid)
    user.save( err => {
      if (err) res.json(err)
      Rating.deleteOne({_id: req.params.rid}, err => {
      if (err) res.json(err)
      res.json(1);
        })
      })
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

// app.post("/users/:id", (req,res) => {
//   User.findById(req.params.id, function(err, user) {
//       user.save( function(err) {
//       user.push({rating})
//           res.json(user)
//       })
//   })
// })

app.post('/ratings', (req,res) => {
  Rating.create({
    rating: req.body.rating,
    selectedRate: req.body.selectedRate,
    rated: req.body.rated,
    id: req.body.id
  }, function(err, rating) {
    res.json(rating)
  })
})

app.get('/ratings', (req,res) => {
  Rating.find({}, function(err,ratings){
      if (err) {
      res.json(err)
      }
      res.json(ratings)
  })
})

app.put("/ratings/:id", (req,res) => {
  Rating.findByIdAndUpdate(req.params.id, {
      rating: req.body.rating
  }, {
      new: true
  }, (err, ratings) =>  {
      res.json(ratings);
  });
});

app.get('/ratings/:id', (req,res) => {
  Rating.findById(req.params.id, (err, rating) => {
  if (err) {
    res.json(err)
  }
  res.json(rating)
  })
});

const rp = require('request-promise');
const $ = require('cheerio');


app.post('/scrape', function(req, res){
  console.log(req.body.movie)
  // const url = `https://usa.newonnetflix.info/catalog/search/${req.body.movie}#results`;
  // rp(url)
  // .then(function(html){
  //   //success!
  //   console.log($('article > div > a > img',html).length);
  //   console.log($('article > div > a > img',html)[0].attribs.alt);
  //   const onNetflix = ($('article > div > a > img',html)[0].attribs.alt)
  //   res.json(onNetflix)
  // })
  // .catch(function(err){
  //   //handle error
  //   // console.log(err)
  // })
  const titleFix = req.body.movie.replace(/_/g," ");
  const url = `https://usa.newonnetflix.info/catalog/search/${req.body.movie}#results`;
  rp(url)
  .then(function(html){
    //success!
    var onNetflix = '';
    console.log($('article > div > a > img',html).length);
    console.log(titleFix)
    if($('article > div > a > img',html).length === 0) {
      res.json(onNetflix)
    } else {
      for (let i = 0; i < $('article > div > a > img',html).length; i++) {
        console.log($('article > div > a > img',html)[i].attribs.alt)
        console.log('FOR LOOP',onNetflix)
        if(titleFix === $('article > div > a > img',html)[i].attribs.alt) {
          console.log('YESSSSSSSSSSSSSSS')
          onNetflix = $('article > div > a > img',html)[i].attribs.alt
          console.log('Netflix',onNetflix)
          res.json(onNetflix)
        } else {
          console.log('NOOOOOOOOOOOOOOOO')
        }
      }

    }
    // console.log($('article > div > a > img',html)[0].attribs.alt);
    // onNetflix = ($('article > div > a > img',html)[0].attribs.alt)
  })
})

app.get('/*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
// app.use('/auth/login', loginLimiter);
// app.use('/auth/signup', signLimiter);

app.use('/auth', require('./routes/auth'));
// app.use('/onNetflix', require('./routes/onNetflix'));
app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));

app.listen(process.env.PORT, () => {
  console.log(`Up and running on port ${process.env.PORT}...`);
});