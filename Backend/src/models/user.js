const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("Invalid email address" + value);
                
            }
        }
    },
    password:{
        type: String,
        required:true
    },
    age:{
        type:Number,
        min: 18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error ("Gender data is not valid")
            }
        },
    },
    about:{

    },
    Skills:{
        type: [String],
    },
    photoUrl:{
        type:String,
        default:"https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg"
    }
},
{
    timestamps:true,
});

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id: user._id},"Dev@Tinder$790",{
        expiresIn:"7d",
    });
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);

    return isPasswordValid;

};



module.exports = mongoose.model("user",userSchema);

