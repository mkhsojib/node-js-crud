const express = require('express');

const exphbs = require('express-handlebars');


const app = express();



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