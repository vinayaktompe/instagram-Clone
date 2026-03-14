const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  
      caption:{
        type:String,
       defult:''
      },
      ImgUrl:{
        type:String,
        required:[true,"ImgURl is Require"]
      },
      user:{
         type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:[true,"user Is Requried"]
      }
})

const postModel = mongoose.model('posts',postSchema)

module.exports=postModel