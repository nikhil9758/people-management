var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port= process.env.PORT || 7000;

var path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(methodOverride('_method'))

const result=[
  {
     id: 1,
     name: 'nikhil',
     age: 21,
     city:'meerut'
  },
  {
    id: 2,
    name: 'nik',
    age: 25,
    city:'meerut'
 }
]

var mysql = require('mysql');
// const { nextTick } = require('process');

// var con= mysql.createConnection({host:"localhost", user:"root", password:"", database:"student"});

//app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 

// con.connect(function(err) {
//     if (err){
//       console.log(err);
//       //throw err;
//     } else {
//       console.log('DB connected :)');
//     }
// });

//to get the homepage
app.get('/',(req,res)=>{
  res.send("This is the home page");
});


app.get('/people/new',(req,res)=>{
    res.render("home");
  });

 //get all people data 
app.get('/people',(req,res)=>{
    // let sql="SELECT * FROM child";
    // con.query(sql,function(err,result){
    //     if (err) {
    //         throw err;
    //       } else {
      // res.send(result)
         res.render("index",{result});
        //  }
   // });
  });  

// get the people data on the basis of id
 app.get('/people/:id',(req,res)=>{
  
  let {id}=req.params;
 
  const results= result.find(c => c.id===parseInt(id));

   res.render("show",{results});
    // let sql="SELECT * FROM child WHERE id=?";
    // con.query(sql,req.params.id,function(err,result){
    //     if (err) {
    //         throw err;
    //       } else {
          // res.send(result);
        
   // });
  }); 

  //get the people data on the basis of name
  // app.get('/people/details/:name',(req,res)=>{
    
  //   let sql="SELECT * FROM child WHERE name=?";
  //   con.query(sql,req.params.name,function(err,result){
  //       if (err) {
  //           throw err;
  //         } else {
  //     //    res.send(result);
  //      res.render("shownames",{result});
  //   }
  //   });
  // }); 
 
app.get('/people/:id/edit',(req,res)=>{
   
    res.render("edit",{result: req.params});
});


app.post('/people',(req,res)=>{
  
    const post= req.body;

    // let sql ="INSERT INTO child SET ?";
    
   result.push(post);
    // con.query(sql,post,function(err,result){
    //     if (err) {
    //         throw err;
    //       } else {

//res.send(result)
        res.redirect('/people');
   //   }
  //  });
//     // res.send("hello");
});


app.put('/people/:id',(req,res)=>{
    const {name, age, city} = req.body;
    const {id}= req.params;

    const results = result.find(c=> c.id === parseInt(id));
    
    results.name= name;
    results.age= age;
    results.city = city;

//    let sql ="UPDATE child SET ? WHERE id=?";
    
//    con.query(sql,[post,reg],function(err,result){
//     if (err) {
//         throw err;
//       } else {
//         res.redirect('/people');}
// });
     res.redirect('/people');
});

app.delete('/people/:id',(req,res)=>{

  const {id}=req.params;
  // console.log(id);
  const results= result.find(c=> c.id !== parseInt(id));
  // result.pop(results);
 
    // let sql="DELETE FROM child WHERE id=?";
    // con.query(sql,req.params.id,function(err,result){
    //     if (err) {
    //         throw err;
    //       } else {
            res.redirect('/people');
    //       }
    // });
  }); 
 
  // app.delete('/people',(req,res)=>{

  //   result=[];

  //   // let sql="DELETE FROM child ";
  //   // con.query(sql,function(err,result){
  //   //     if (err) {
  //   //         throw err;
  //   //       } else {
  //           res.redirect('/people');
  //   //       }
  //   // });
  // });   

  app.set('port', process.env.PORT || 7000);

var server = app.listen(port, () => {
  console.log("server running");
})