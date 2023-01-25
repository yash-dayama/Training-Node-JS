const { query } = require('express');
const express = require('express');
const mysql = require('mysql');

// create connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql',
});

// connect to MySql
db.connect((err) => {
    if (err){
        throw err;  
    }
    console.log("Connected to MySQL");
});

const app = express();

// create Database
app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, (err) => {
        if (err){
            throw err;
        }
        res.send("Database created");
    });
});

// create Table
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255),designation VARCHAR(255), PRIMARY KEY (id))'
    db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send("Employee Table created");
    });
});

//Insert Employee
app.get('/employee1', (req, res) => {
    let post = {name: 'Yash Dayama', designation: 'Software Engineer'};
    let sql = 'INSERT INTO employee SET?';
    let query = db.query(sql, post, err => {
        if(err){
            throw err;
        }
        res.send("Employee Added")
    });
}); 

// Select employees
app.get('/getemployee', (req, res) => {
    let sql = 'SELECT * FROM employee';
    let query = db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.log(results);
        res.send('Employes details fetched');
    });
});

// update employee
app.get('/updateemployee/:id', (req, res) => {
    let newName = 'Update Name';    
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, err => {
        if(err){
            throw err;
        }
        res.send("Employee Updated");
    });  
});

// delete employee
app.get('/deleteemployee/:id', (req, res) =>{
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
    let query = db.query(sql, err =>{
        if(err){
            throw err;
        }
        res.send("Employee Deleted");
    });

});

app.listen('3000', ()=> {
    console.log("Server started on port 3000");
});