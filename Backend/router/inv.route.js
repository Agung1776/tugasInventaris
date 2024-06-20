const express = require('express') 

const router = express.Router(); 

const invController = require('../controllers/inv.controller') 

router.use(express.json()) 

router.use(express.urlencoded({extended:true})) 

router.get('/getinv',invController.getAllinvs) 

router.post('/insertinv',invController.insertinv) 

router.put('/updateinv/:id',invController.updateinv) 

router.delete('/dropinv/:id',invController.dropinv) 

router.post('/search',invController.search) 

 

module.exports = router 