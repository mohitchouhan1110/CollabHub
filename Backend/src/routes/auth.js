const express = require("express");
const authRouter= express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


authRouter.post("/signup",async (req,res)=>{
    
    try{
        //validate of data
    validateSignUpData(req);

    const {firstName,lastName,emailId,password} = req.body;

    //Encrypt the Password
    const passwordHash = await bcrypt.hash(password,10);
   //console.log(passwordHash);

    //Creating a new instance of the user models
    
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    })
   
    
   const savedUser = await user.save();
   const token = await savedUser.getJWT();
   res.cookie("token", token,{
    expires:new Date(Date.now() + 8 * 3600000),
   });
   res.json({message: "User Added successfully!!",data: savedUser});
   } catch(err){
    res.status(400).send("ERROR :" + err.message)
   }

  
});

authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId,password}=req.body;

        const user = await User.findOne({emailId: emailId});
        // const user = await User.findOne({ emailId: emailId.toLowerCase() });

        if(!user){
            throw new Error("EmailId is not present in DB");
        }
        
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

           //Create a JWT Token
        //    const token = await jwt.sign({_id: user._id},"Dev@Tinder$790",{expiresIn:"1h"});
         const token = await user.getJWT();
           

           //Add the token to cookie and send the response back to the user

            res.cookie("token",token);
            res.send(user);
           //

        }else{
            throw new Error("Password is not Correct");
        }

    }catch (err){
     res.status(400).send("ERROR:" + err.message);
    }
})

authRouter.post("/logout", async (req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("LogOut succesfull");
})

module.exports=authRouter;