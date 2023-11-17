const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },

    phoneNumber : {
        type : String,
        require : true
    },
    address : {
        type : String,
        require : true
    },
    isEmployer : {
        type : Boolean,
        default : false
    },
    otp : {
        type : String,
        default: ""
    }
}, {timestamps : true});

module.exports  = mongoose.model("User", UserSchema);