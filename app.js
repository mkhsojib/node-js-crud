const express = require('express');

const exphbs = require('express-handlebars');

const methodOverride = require('method-override')

const bodyParser = require('body-parser');


const mongoose = require('mongoose');


const app = express();


// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// mongo db connection

mongoose.connect('mongodb://localhost/video-dev', {

  useMongoClient: true
})

  .then(() => console.log('MongoDB Connected ....'))
  .catch(err => console.log(err));

// Load Idea Model

require('./models/Idea');

const Idea = mongoose.model('ideas');


// Handlebars Middleware

app.engine('handlebars', exphbs({

  defaultLayout: 'main'

}));
app.set('view engine', 'handlebars');


// body parser middleware


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// method override middleware

app.use(methodOverride('_method'))

// index route

app.get('/', (req, res) => {

  const title = 'Welcome Index Page';

  res.render('index', {
    title: title
  });

});



// about route

app.get('/about', (req, res) => {

  const about = 'About US Page'

  res.render('about', {

    about: about
  });

})


// idea page index

app.get('/ideas', (req, res) => {

  Idea.find({})
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas
      })
    })



})



// idea page edit

app.get('/ideas', (req, res) => {

  Idea.find({})
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas
      })
    })



})


// add video form

app.get('/ideas/add', (req, res) => {

  res.render('ideas/add');

})

// edit video form

app.get('/ideas/edit/:id', (req, res) => {

  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      res.render('ideas/edit', {
        idea: idea
      });

    })

})


// process form

app.post('/ideas', (req, res) => {

  let errors = [];

  if (!req.body.title) {

    errors.push({ text: 'Please add video title' })

  }

  if (!req.body.details) {

    errors.push({ text: 'Please add video details' })

  }

  if (errors.length > 0) {

    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    })


  }

  else {

    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)

      .save()
      .then(idea => {
        res.redirect('/ideas');
      })
  }




})


// Edit form process

app.put('/ideas/:id', (req, res) => {

  Idea.findOne({

    _id: req.params.id
  })
    .then(idea => {
      // new save value

      idea.title = req.body.title
      idea.details = req.body.details


      idea.save()
        .then(idea => {
          res.redirect('/ideas')
        })


    })

})



const port = 5000;

app.listen(port, () => {

  console.log(`Server started on port ${port}`);



});