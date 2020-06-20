var exp = require('express');
var bp=require('body-parser');
var app = exp();
var urlencodedParser = bp.urlencoded({ extended: false })
var fs = require('fs');
var page = (file,res)=>{fs.readFile(file, function(err,data){
    res.writeHead(200,{'Content-type':'text/html'})
    res.end(data)
})};
var mysql = require('mysql');
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
})
var reqs=require('requests');


//getting the post
app.post('/',urlencodedParser,function(reqq,res){
    console.log(reqq.body.ch)
    con.connect(function(err){
        var sql = "Insert into chat (txt)values('"+reqq.body.ch+"')";
        con.query(sql,function(err){})
    });
})
app.get('/', (req, res) => {page('index.html',res)})
app.get('/req.js', (req, res) => {page('req.js',res)})
app.get('/index.css', (req, res) => {page('index.css',res)})

app.get('/chat', (req,res)=>{   con.connect(function(err){
    var sql = "SELECT * from chat";
    con.query(sql,function(err,resl){
        var y = []
        for(var x=0;x<resl.length;x++){
            y.push(resl[x].txt);
        }
        res.send(y);
    })
});});
app.listen(8080)