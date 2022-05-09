const mysql = require('mysql')
const express = require('express')
const app = express()
const bodyparser = require('body-parser');

app.use(bodyparser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: '1234',
    database: "testDB"
})
app.listen(4000,()=>{
    console.log('servers is running on port 4000')
    })
    

connection.connect((err)=>{
    if(!err){
        console.log('DB connection Succeed')
    }else{
        console.log('Db connection Failed'+ err)
    }
})


// Insert a data into Students Table

 app.post('/students/create',(req,res)=>{
   // const data = {name:"yyy",Branch:"CSE",College:"xxxyy",Hobby:"Coding"}
   data = req.body;
   connection.query('INSERT INTO Students SET?',data,(err,results,fields)=>{
       if(!err){
           res.send("Data Inserted SuccessFully"+results)
       }else{
        res.send(err)       }
   })

})

// get all the students

app.get('/students',(req,res)=>{
    connection.query('SELECT * FROM Students',(err,results,fields) =>{
        if(!err){
            res.send(results)
        }else{
            res.send(err)        }
    })

    

})
// get an student with id

app.get('/students/:id',(req,res)=>{
    connection.query('SELECT * FROM Students WHERE id = ?',[req.params.id],(err,results,fileds) =>{
        if(!err){
            res.send(results)
        }else{
            res.send(err)        }
    })

    

})

// Delete a data 

app.delete('/students/delete/:id',(req,res)=>{
    connection.query('DELETE * FROM Students WHERE id =?',[req.params.id],(err,results,fileds)=>{
        if(!err){
            res.send('data deleted succesfully'+results)
        }else{
            res.send(err)        }
    })

})

// upadte a data Data taking from postman

app.put('/students/update',(req,res)=>{
    connection.query('UPDATE  `Students` SET `name`= ? ,`Branch`=?, `College`=? ,`Hobby`=? WHERE `id` = ?',[req.body.name,req.body.Branch,req.body.Hobby],(err,results,fileds)=>{
        if(!err){
            res.send(results)
        }else{
            res.send(err)
        }
    })
})





