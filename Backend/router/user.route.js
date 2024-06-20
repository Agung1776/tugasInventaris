const express = require('express') 

const router = express.Router(); 

const userController = require('../controllers/user.controller') 

router.use(express.json()) 

router.use(express.urlencoded({extended:true})) 

router.get('/getuser',userController.getAllusers) 

router.post('/insertuser',userController.insertuser) 

router.put('/updateuser/:id',userController.updateuser) 

router.delete('/dropuser/:id',userController.dropuser) 

router.post('/login',userController.login) 

router.post('/search',userController.search)

module.exports = router