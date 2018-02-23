const express = require('express');


const app = express();


// how middleware works

app.use(function (req, res, next) {
  // console.log('Time:', Date.now())
  req.name = 'mkh sojib'
  next()
})


// index route

app.get('/', (req, res)=>{

console.log(req.name);


res.send(req.name);

});



// about route

app.get('/about', (req, res)=>{

res.send('this is about ');

})



const port = 5000;

app.listen(port, ()=>{

  console.log(`Server started on port ${port}`);



});