const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
        type:String,
        required:true
    },
    Email :{
        type:String,
        required:true,
        unique:true
    },
    PhoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    Subject :{
        type: String,
        requried: true
    },
    Message:{
        type: String,
        requried :true
    }
});

const ContactUS = new mongoose.model("ContactUs", userSchema);

module.exports = ContactUS;