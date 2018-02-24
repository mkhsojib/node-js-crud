const express = require('express');

const exphbs = require('express-handlebars');

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



const port = 5000;

app.listen(port, () => {

  console.log(`Server started on port ${port}`);



});