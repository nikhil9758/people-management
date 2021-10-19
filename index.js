var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port= process.env.PORT || 7000;

var path = require('path');
// const cors= require('cors')
// app.use(cors({origin:"*"}))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(methodOverride('_method'))

var mysql = require('mysql');
// const { nextTick } = require('process');

var con= mysql.createConnection({host:"localhost", user:"root", password:"", database:"student"});

//app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 

con.connect(function(err) {
    if (err){
      console.log(err);
      //throw err;
    } else {
      console.log('DB connected :)');
    }
});

app.get('/',(req,res)=>{
  res.send("This is the home page");
});

app.get('/student/new',(req,res)=>{
    res.render("home");
  });

 //get all student data 
app.get('/student',(req,res)=>{
    let sql="SELECT * FROM child";
    con.query(sql,function(err,result){
        if (err) {
            throw err;
          } else {
      // res.send(result)
         res.render("index",{result});
          }
    });
  });  

// get the student data on the basis of id
 app.get('/student/:id',(req,res)=>{
    let sql="SELECT * FROM child WHERE id=?";
    con.query(sql,req.params.id,function(err,result){
        if (err) {
            throw err;
          } else {
          // res.send(result);
        res.render("show",{result});
    }
    });
  }); 

  //get the student data on the basis of name
  app.get('/student/details/:name',(req,res)=>{
    
    let sql="SELECT * FROM child WHERE name=?";
    con.query(sql,req.params.name,function(err,result){
        if (err) {
            throw err;
          } else {
      //    res.send(result);
       res.render("shownames",{result});
    }
    });
  }); 
 
app.get('/student/:id/edit',(req,res)=>{
   
    res.render("edit",{result: req.params});
});


app.post('/student',(req,res)=>{
    // const post= {id:51,name:'nick', age:24, city:'meerut'};
    const post= req.body;
    // console.log(req.body);
// res.send({test:4567,ghjj:6889})
    let sql ="INSERT INTO child SET ?";
    

    con.query(sql,post,function(err,result){
        if (err) {
            throw err;
          } else {

//res.send(result)
        res.redirect('/student');
      }
    });
//     // res.send("hello");
});


app.put('/student/:id',(req,res)=>{
    const post= req.body;
    const reg= req.params.id;
    
   let sql ="UPDATE child SET ? WHERE id=?";
    
   con.query(sql,[post,reg],function(err,result){
    if (err) {
        throw err;
      } else {
        res.redirect('/student');}
});
 
});

app.delete('/student/:id',(req,res)=>{
    let sql="DELETE FROM child WHERE id=?";
    con.query(sql,req.params.id,function(err,result){
        if (err) {
            throw err;
          } else {
            res.redirect('/student');}
    });
  }); 
 
  app.delete('/student',(req,res)=>{
    let sql="DELETE FROM child ";
    con.query(sql,function(err,result){
        if (err) {
            throw err;
          } else {
            res.redirect('/student');}
    });
  });   

  app.set('port', process.env.PORT || 7000);

var server = app.listen(port, () => {
  console.log("server running");
})