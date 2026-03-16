const postModel = require('../model/post.model')
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const  jwt = require('jsonwebtoken')

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function postController (req,res){
      console.log(req.body,req.file)

   

    const token = req.cookies.token 
    
    if(!token){
        return res.status(401).json({
            massage: "UnAuthorized User"
        })
    }
    

   let decoded=null

       try{
         decoded=jwt.verify(token,process.env.JWT_SECRET)
      }catch(err){
        return res.status(401).json({
            massage:"unAuthorized User"
        })
      }
      

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
 
    })

  

    const post = await postModel.create({
          caption:req.body.caption,
          ImgUrl:file.url,
          user:decoded.id
    })
res.status(201).json({
    massage:"post Created",
    post

})
} 


async function getPostController (req,res){
     const token = req.cookies.token

let decoded = null
     try{
 decoded = jwt.verify(token,process.env.JWT_SECRET)

     }catch(err){
        return res.status(403).json({
            massage:"UnAuthorized User"
        })
     }

   const userId = decoded.id

    const post = await postModel.find({
        user:userId})

   return res.status(201).json({
      massage:"Post Loaded Successfully",
      post:post
   })
}

async function getPostDetailsController (req,res){
     const token =req.cookies.token
     if(!token){
         return res.status(403).json({
            massage:"UnAuthorized User"
         })
     } 

     let decoded
     try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
     }catch(err){
        res.status(403).json({
            message:"UnAuthorized User"
        })
     }

     const userId = decoded.id
    const postId = req.params.id

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post Not Found"
        })

    }

    const isValid = post.user.toString() === userId
       if(!isValid){
        return res.status(403).json({
            message:"Forbidden Credential"
        })
       }

       return res.status(201).json({
        message:"post Loaded",
        post:post
       })
}



module.exports = {
    postController,
    getPostController,
    getPostDetailsController
}