const express = require('express');


const app = express();


// index route

app.get('/', (req, res)=>{

res.send('this is index');

});



// about route

app.get('/about', (req, res)=>{

res.send('this is about page');

})



const port = 5000;

app.listen(port, ()=>{

  console.log(`Server started on port ${port}`);



});