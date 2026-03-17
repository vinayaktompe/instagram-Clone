const jwt = require('jsonwebtoken')

async function identifyUser (req,res,next){
     const token = req.cookies.token
 

      let decoded = null
     try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
     } catch(err){
        return  res.status(403).json({
            message:"UnAuthorized user"
        })
     }

     req.user = decoded

     next()
}

module.exports=identifyUser