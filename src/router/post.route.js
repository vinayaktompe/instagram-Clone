const express = require('express')
const postController = require('../controller/post.controller')
const getPostController = require("../controller/post.controller")
const getPostDetailsController=require('../controller/post.controller')
const multer = require("multer")

const upload = multer({ storage: multer.memoryStorage() })



const postRouter = express.Router()

postRouter.post('/',upload.single('img'),postController.postController)

postRouter.get('/',postController.getPostController)

postRouter.get('/:id',postController.getPostDetailsController)




module.exports=postRouter