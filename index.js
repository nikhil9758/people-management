var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port= process.env.PORT || 7000;

var path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(methodOverride('_method'))

var result=[
  {
     id: '1',
     name: 'nikhil',
     age: 21,
     city:'meerut'
  },
  {
    id: '2',
    name: 'aryan',
    age: 21,
    city:'noida'
 }
]

app.use(bodyParser.urlencoded({ extended: true })) 


//to get the homepage
app.get('/',(req,res)=>{
  res.send("This is the home page");
});


app.get('/people/new',(req,res)=>{
    res.render("home");
  });

 //get all people data 
app.get('/people',(req,res)=>{
         res.render("index",{result});
  });  

// get the people data on the basis of id
 app.get('/people/:id',(req,res)=>{
  
  let {id}=req.params;
  
  const results= result.find((c)=> c.id===id);
   res.render("show",{results});

  }); 

 //edit the data 
app.get('/people/:id/edit',(req,res)=>{
   
    res.render("edit",{result: req.params});
});

//push the data
app.post('/people',(req,res)=>{
  
    const post= req.body;
  
   result.push(post);
 
        res.redirect('/people');
});

//update the data
app.put('/people/:id',(req,res)=>{
    const {name, age, city} = req.body;
    const {id}= req.params;

    const results = result.find(c=> c.id === id);
    
    results.name= name;
    results.age= age;
    results.city = city;

     res.redirect('/people');
});

//delete the data
app.delete('/people/:id',(req,res)=>{

  const {id}=req.params;
  result= result.filter(c=> c.id !== id);

            res.redirect('/people');
  }); 
    

  app.set('port', process.env.PORT || 7000);

  //connecting to server
var server = app.listen(port, () => {
  console.log("server running");
})