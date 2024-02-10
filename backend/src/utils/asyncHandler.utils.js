const asyncHandler=(fn)=>(res,req,next)=>{
    try{
       return fn(res,req,next)            
    }
    catch(error) 
    {
        res.status(500).json({
            success:false,
            message:"Error in the server"            
        })
    }

}

export {asyncHandler}