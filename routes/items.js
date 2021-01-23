const express = require('express')
require('dotenv').config()
const mysql = require('mysql')
const router = express.Router()

let pool = mysql.createPool({
     host : process.env.DB_HOST,
     user : process.env.DB_USER,
     password : process.env.DB_PASS,
     database : process.env.DB_NAME
})

pool.getConnection((err, connection) => {
   if(err)
     console.log(err)
   else
   {
     console.log("database_connected")
   }
   if (connection) connection.release();
   return;
})

router.get('/getAllItems',(req,res)=>{
    let sql = "SELECT * FROM helena"
    pool.query(sql,(err,result)=>{
        if(err)
         console.log(err)
        else
         res.status(200).json(
             {
                 message : "data fetched",
                 data : result
             }
         )
    })
    
})

router.post('/addItem', (req,res) =>{
    let task = req.body.task
    let sql = `INSERT INTO helena (name) VALUES ('${task}')`

    pool.query(sql,(err,result)=>{
        if(err)
         console.log(err)
        else
         res.status(200).json(
             {
                 message : "data fetched",
                 taskId : result.insertId
             }
         )
    })
  
})


router.get('/getById/:id', (req,res)=>{
    id = req.params.id
    let sql = "SELECT * FROM helena WHERE id = ?"
    pool.query(sql,[id],(err,result)=>{
        if(err) 
          throw err
        else 
          res.status(200).json(
              {
                 message : "data fetched",
                 data    : result
              }
          )
    })
    
 })

router.put('/updateById/:id',(req,res) => {
    let id = req.params.id
    let sql = `UPDATE helena SET name = ? WHERE id = ${id}`
    let task = req.body.task
    pool.query(sql,[task],(err,result)=>{
        if(err)
         console.log(err)
        else
         res.status(200).json(
             {
                 message : "task Edited"
             }
         )
    })
  
})

router.delete('/deleteById/:id',(req,res)=>{
    let id = req.params.id
    let sql = "DELETE FROM helena WHERE id = ?"
    pool.query(sql,[id],(err,result)=>{
        if(err)
         console.log(err)
        else
         res.status(200).json(
             {
                 message : "row deleted"
             }
         )
    })
  
})



module.exports = router