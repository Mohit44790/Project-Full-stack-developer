var express=require("express");
var bodyParser=require("body-parser");
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Sample');
var db=mongoose.connection;
db.on('error',console.log.bind(console,"connection error"));
db.once('open',function(callback){
    console.log("connection succeeded");
})

var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.post('/Sign_up',function(req,res){
    var name =req.body.name;
    var email =req.body.email;
    var pass =req.body.password;
    var phone = req.body.phone;
    var address = req.body.Address;
    

    var data ={
        "name":name,
        "email":email,
        "password":pass,
        "phone":phone,
        "address":address,
        
    }
    db.collection('details').insertOne(data,function(err,collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
    });
    return res.redirect('signup_success.html');
})
app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-origin':'*'
    });
    return res.redirect('Home.html');
}).listen(8000)
console.log("server listening at port 8000");