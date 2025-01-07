const express = require('express')
const router= express.Router()
const controller= require('../controller/user')
const memeController= require('../controller/meme')

router.post('/createUser',controller.createUser)
router.post('/authenticateUser',controller.authenticateUser)
router.post('/generateMeme',memeController.generateMeme)

module.exports= router;
