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
    console.log("id:"+results[0].test_id);
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
    let uid = request.body.byUID;
    let t=new Date();
    let tStr = t.toString();
    let temp = request.body.byTemper;
    let hum = request.body.byHum;
    let queryStr = "INSERT INTO pi_data VALUES ("+"\""+uid+"\",\""+tStr+"\",\""+temp+"\",\""+hum+"\")";
    connection.query(queryStr,(err,results)=>{
        if(err){
            console.log("err:"+err);
        }
        console.log("results",results);
        //let queryRes = results;
    })

    let resObj={};
    resObj['req']=request.body;
    resObj['time']=t;
    resObj['msg']='success';
    response.send(resObj);
})

server.post('//getdata', function (request, response) {
    //解析post请求参数
    console.log(request.body);
    let uid = request.body.uid;
    let queryData;
    let queryStr = "select * from pi_data where uid=\""+uid+"\" order by time desc";
    connection.query(queryStr,(err,results)=>{
        if(err){
            console.log("err:"+err);
        }
        console.log(results[0]);
        queryData=results[0];
        //let queryRes = results;
        let resObj={};
        resObj['data']=queryData;
        resObj['msg']='not fully success';
        console.log(resObj);
        response.send(resObj);
    })


})

server.listen(7777);