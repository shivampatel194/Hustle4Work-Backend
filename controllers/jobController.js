const jobModel = require("../models/job");

const createJob = async (req,res)=> {
    console.log("check");
    console.log(req.userId);

    const {title,description,location,requirements,payRate,jobType,uploadDate} = req.body;

    const newJob = new jobModel({
        title : title,
        description : description,
        location : location,
        requirements : requirements,
        payRate : payRate,
        jobType : jobType,
        uploadDate : uploadDate
    });

    try {

        const savedJob = await newJob.save();
        console.log(savedJob);

        res.status(201).json(savedJob);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong!"});
    }
}


const getAllJob = async(req,res)=>{
    try {
        const jobData = await jobModel.find();
        res.status(200).json(jobData);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong!"});
    }
}

module.exports = {createJob, getAllJob}

