const express = require('express')
const postController = require('../controller/post.controller')
const getPostController = require("../controller/post.controller")
const getPostDetailsController=require('../controller/post.controller')
const multer = require("multer")

const identifyUser = require('../middleware/auth.middleware')

const upload = multer({ storage: multer.memoryStorage() })



const postRouter = express.Router()

postRouter.post('/',upload.single('img'),identifyUser,postController.postController)

postRouter.get('/',identifyUser,postController.getPostController)

postRouter.get('/:id',identifyUser,postController.getPostDetailsController)




module.exports=postRouter