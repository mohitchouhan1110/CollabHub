const express = require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const{validateEditProfileData} = require("../utils/validation")

profileRouter.get("/profile/view",userAuth, async (req,res)=>{

    // try{
    //     const cookies = req.cookies;

    // const{ token }=cookies;
    // if(!token){
    //     throw new Error("Invalid Token")
    // }
    // //Validate my token
    
    // const decodedMessage = async jwt.verify(token,"Dev@Tinder$790");
    
    // const { _id } = decodedMessage;
   try {
    const user = req.user;
    if(!user){
        throw new error("user does not exist");
    }

    res.send(user);}
    catch(err){
        res.status(400).send("ERROR :" + err.message);
    }

    //console.log(cookies);
    //res.send("Cookie Reading!!")
});

profileRouter.patch("/profile/edit",userAuth, async (req,res)=>{
  try{

    if(!validateEditProfileData(req)){
        return res.status(400).send("Invaild Edit Requests")
    }

    const loggedInUser = req.user;
     Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));

   await loggedInUser.save();

   res.send(`${loggedInUser.firstName}, your profile updated successfully`);

  }catch (err){
      res.status(400).send("ERROR : " + err.message);
  }
});


module.exports = profileRouter;