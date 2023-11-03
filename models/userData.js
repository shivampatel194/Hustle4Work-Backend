const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({

    username : {
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
    qualification : {
        type : String,
    },
    skills : {
        type : [String]
    },
    experience : {
        type : [String]
    },

    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true
    }
}, {timestamps : true});

module.exports = mongoose.model("UserData", UserDataSchema);