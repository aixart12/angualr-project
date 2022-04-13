

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//  data base Connection

const db = mysql.createConnection({
    host : 'localhost',
    user:'root',
    password:'Hany@123',
    database:'contact-info',
    port:3306

})

// check database Connection

db.connect(err =>{
    if(err){console.log(err, 'dberr');}
    console.log('database Connected');
})


//  get all data
app.get('/user' , (req ,res)=>{
    let qr = 'select * from user';
    db.query(qr , (err , result)=>{
        if(err){
            console.log(err,'err');
        }
        if(result.length>0){
            res.send({
                message:'all user data',
                data: result
            });
        }
    });
})

// get single data 
app.get('/user/:id' ,(req,res)=>{

    let gID = req.params.id;
    let qr = 'select * form user where id = $(gID)';
    db.query(qr , (err , result)=>{
        if(err){
            console.log(err,'err');
        }
        if(result.length>0){
            res.send({
                message:'Single user data',
                data: result
            });
        }
        else{
            res.send({
                message:'data not found'
            })
        }
    });
})

// Create user
app.post('/user', (req, res)=>{
    console.log(req.body, "Create data");

    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let phone = req.body.phone;
    let address = req.body.address;
    let pin = req.body.pin;
    // let message = req.body.message;

    

    let qr = `insert into user(fname , lname, email, phone ,address,pin) 
                    values  ('${fname}' ,'${lname}' ,'${email}','${phone}','${address}','${pin}')`;

    db.query(qr ,  (err , result)=>{
        if(err){
            console.log(err,'err');
            console.log(qr , 'qr');
        }
        console.log(result ,'result');
        res.send({
            message:' data Inserted'
        });
    });
})

app.listen(3000, (req, res)=>{
    console.log("Express API id runnging at port 3000");
})