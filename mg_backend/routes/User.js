const express = require('express')
const router= express.Router()
const controller= require('../controller/user')

router.post('/createUser',controller.createUser)
router.post('/authenticateUser',controller.authenticateUser)
router.post('/generateMeme',controller.generateMeme)

module.exports= router;
