 export default {
     
    isAuthenticated:  (req,res)=>{
        if(req.user){
            next();
        } else{
            return res.status(403).json({message:'forbidden'})
        }
    }
}



