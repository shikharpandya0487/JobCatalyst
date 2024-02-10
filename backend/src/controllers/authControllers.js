const User=require("../models/User");
//Logic to get the user data from backend
const home=async(req,res)=>{
    try{
        res.status(200).send('Welcome to world best mern series by thapa using router');
    }
    catch(error){
        console.log(error);
    }
}    
const signup=async(req,res)=>{
    try{
        console.log(req.body);
        const{username,email,password}=req.body;
        const userExist=await User.findOne({email:email}) 
        if(userExist){
            return res.status(400).json({message:"Email already Exist"});
        }
        //hash the password
        // const saltRound=10; //kitna complex password hash karna hai
        // const hash_password=await bcrypt.hash(password,saltRound);
        //defining it in usermodel using pre
        // await User.create({username,email,phone,password});

        //now will change the password with haspassword
        // const userCreated=await User.create({username,email,phone,password:hash_password})
        const userCreated=await User.create({username,email,password})

        // res.status(201).json({msg:userCreated});
        //using jwt tocken
        res.status(201).json({msg:userCreated,tocken:await userCreated.generateTocken(),
        userId:userCreated._id.toString()});
    }
    catch(error){
        // res.status(400).send({msg:"What colour is your Buggati ?"});
        //since we are using error file -> therefore we will using next(error)
        next(error);
    }
}



//user login logic
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        //check email is valid or not, already exist or not
        const userExist=await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message:"Invalid Credetials"});
        }

        //compare password
        //jo user ne password dala compare with database mein jo password hai
        // const user=await bcrypt.compare(password,userExist.password);
        //creating a function to compare the password, define the definition of the function in user-model
        const user=await userExist.comparePassword(password);
        if(user){
            res.status(200).json({msg:"LOGIN SUCCESS",
                tocken:await userExist.generateTocken(),
                userId:userExist ._id.toString(),
            
            });
        }
        else{
            res.status(5001).json({message:"INVALID SERVER ERROR"});
        }

    }
    catch(error){

    }
};

const user=async(req,res)=>{
    try{
        const userData=req.user;
        console.log(userData);
        return res.status(200).json({msg:userData});
    }   
    catch(error){
        console.log(`Error from the user route ${error}`);
    }
}
module.exports={user,signup,login,home};  