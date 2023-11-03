const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

    title : {
        type : String,
        require : true
    },
    
    description : {
        type : String,
        require : true
    },

    location : {
        type : String,
        require : true
    },
    requirements : {
        type : String,
        require : true
    },
    payRate : {
        type : String,
    },
    jobType : {
        type : String
    },
    uploadDate : {
        type : String
    },

    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "job",
        require : true
    }
}, {timestamps : true});

module.exports = mongoose.model("job", jobSchema);