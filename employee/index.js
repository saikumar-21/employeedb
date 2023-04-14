const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors");


//cors module for frontend and backend connection
app.use(cors());
app.use(express.json());

///Creating database connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employeedb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// GET request to display the records
  app.get("/employees", ( req,res)=>{
    const va = con.query("SELECT * FROM employeedb.empdetails", (err,result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
  })


  //POST request to create a record

app.post("/create", (req,res) => {
    // const id = req.body.id;
    const name = req.body.name;
    const title = req.body.title;
    const phone = req.body.phone;
    const email= req.body.email;
    const adress = req.body.adress;
    const city = req.body.city;
    const state = req.body.state;
    const priEcon = req.body.priEcon;
    const ph1 = req.body.ph1;
    const rel1 = req.body.rel1 ;
    const secEcon = req.body.secEcon;
    const ph2 = req.body.ph2;
    const rel2 = req.body.rel2 ;

    con.query("INSERT INTO empdetails( name, title, phone, email, adress, city, state, priEcon, ph1, rel1, secEcon, ph2, rel2) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", [ name, title, phone, email, adress, city, state, priEcon, ph1, rel1, secEcon, ph2, rel2], 
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("values inserted");
        }
    })

})


//PUT request to Update the existing record request
app.put("/update", async (req, res) =>{
    const data = req.body;
    const id = req.body.id;

    await con.query("UPDATE empdetails  SET name=?,title=?,phone=?,email=?,adress=?,city=?,state=?,priEcon=?,ph1=?,rel1=?,secEcon=?,ph2=?,rel2=? WHERE id = ?",[data.name, data.title, data.phone, data.email, data.adress, data.city, data.state, data.priEcon, data.ph1, data.rel1, data.secEcon, data.ph2, data.rel2, id],
        (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
        }
    )
})

//DELETE request to remove the existing record 

app.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;
    await con.query("DELETE FROM empdetails WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


  //Listening on port 3001

app.listen(3001,(err,res)=>{
    if(err){
        console.log('error');
    }else{
        console.log('Connected to server 3001!!!')
    }
})


                    