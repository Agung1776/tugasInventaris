const mysql = require("mysql")  

const db = mysql.createConnection({ 

    host: "localhost", 

    user: "root", 

    password: "", 

    database: "inventaris" 

}) 

 

db.connect(error => { 

    if (error) { 

        console.log(error.message) 

    } else { 

        console.log("MySQL Connected") 

    } 

}) 

module.exports = db 