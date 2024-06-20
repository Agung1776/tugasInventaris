const express = require("express")  

const cors = require("cors")  

const app = express()  

 

app.use(cors()) 
const userRoute = require('./router/user.route'); 
const invRoute = require('./router/inv.route'); 

app.use('/inv',invRoute) 
app.use('/user',userRoute) 
app.use(express.static(__dirname)) 

app.listen(8000,()=>{ 

    console.log('server port 8000') 

}) 