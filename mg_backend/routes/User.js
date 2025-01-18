const express = require('express')
const router= express.Router()
const controller= require('../controller/user')
const memeController= require('../controller/meme')

router.post('/createUser',controller.createUser)
router.post('/authenticateUser',controller.authenticateUser)
router.post('/generateMeme',memeController.generateMeme)
router.post('/getMemes',memeController.getMeme)
router.post('/updateMemes',memeController.updateMeme)

module.exports= router;
