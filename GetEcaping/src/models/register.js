const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    Firstname :{
        type:String,
        required:true
    },
    Middlename :{
        type:String,
        required:true
    },
    Lastname :{
        type:String,
        required:true
    },
    Gender :{
        type:String,
        required:true
    },
    Phone :{
        type:Number,
        required:true,
        unique:true
    },
    Address :{
        type: String,
        requried:true
    },
    Email :{
        type:String,
        required:true,
        unique:true
    },
    Password :{
        type:String,
        requried:true
    },
    ConfirmPassword :{
        type:String,
        required:true
    }


});

userSchema.pre("save", async function (next){

    if(this.isModified("Password")){
    // const PasswordHash = await bcrypt.hash(Password, 10);
    console.log('the current password is ${this.Password}');
    this.Password = await bcrypt.hash(this.Password, 10);
    console.log('the current password is ${this.Password}');

    this.ConfirmPassword = undefined;
    }

    next();
});

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;