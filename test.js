let express = require('express');
let bodyParse = require('body-parser')

const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "66045829@lsZ",
    database: 'test'
});

connection.connect(function(err){
    if(err){
        console.error('连接失败: ' + err.stack);
        return;
    }
    console.log('连接成功 id ' + connection.threadId);
})

connection.query('select * from test_table where test_id ="00000"',(err,results,fields)=>{
    if(err){
        console.log(err);
    }
    console.log(results);
})

let server = express()

server.get('/',function(req,res){
    res.send('hello');
})
// let urlencoded = bodyParse.urlencoded({extends:true});

// let jsonParser = bodyParse.json();

// server.use('/',jsonParser);
server.use(bodyParse.urlencoded({
    extended: true
  }));
server.post('/', function (request, response) {
    //解析post请求参数
    console.log(request.body);
    response.send(request.body)
})
server.listen(7777);