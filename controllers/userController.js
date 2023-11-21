const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userData = require("../models/userData");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const config = require("../config");
const { use } = require("../routes/jobRoutes");
const job = require("../models/job");
const user = require("../models/user");
const jobmodel = require("../models/job");
const SECKRET_KEY = "Hustle4work";

const signup = async (req,res)=>{

    const {username, email, password, address, phonenumber, isEmployer} = req.body;

    try {
        
        const existingUser = await userModel.findOne({email : email});
        
        

        if(existingUser){
            return res.status(400).json({message : "User already axist!"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({
            email : email,
            password : hashedPassword,
            username : username,
            phoneNumber : phonenumber,
            address : address,
            isEmployer : isEmployer
        });

        
        const token = jwt.sign({email : result.email, id : result._id}, SECKRET_KEY);
        console.log("in controller",token)

        res.status(201).json({
            user : result,
            token : token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong!"});
    }
};

const signin = async (req,res)=>  {

    const {email, password} = req.body;
    try {

        const existingUser = await userModel.findOne({email : email});

        if(!existingUser){
            return res.status(404).json({message : "User not found!"});
        }
        
        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credential"});
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, SECKRET_KEY);
        res.status(201).json({
            user : existingUser,
            token : token
        });


        
    } catch (error) {

        console.log(error);
        res.status(500).json({message : "Something went wrong!"});        
    }

};

const resetPass = async (req, res) => {
    const { email } = req.body;
  
    try {
        const existingUser = await userModel.findOne({email : email});

        
      if (!existingUser) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false ,digits : true});

      try {
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { otp: otp } },
            { new: true } 
        ); 
        console.log("existinguser with update", otp + existingUser.otp);

        
      } catch (error) {
        console.log("otp error", error);
      }
  
  
      // Send the OTP email
      await sendOtpMail(existingUser.username, existingUser.email, otp);
  
      res.status(200).json({ message: "OTP sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };


const sendOtpMail = async (name, email, code) => {
    console.log("credenstials",config.emailUser + config.emailPassword);
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "patelshivam21194@gmail.com",
          pass: "alkmjbcdeahszzhf",
        },
      });
  
      const mailOption = {
        from: "hustle4work@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `<p>Hey ${name}, your verification code is: ${code}</p>`,
      };
  
      const info = await transporter.sendMail(mailOption);
  
      console.log("Mail has been sent!", info.response);
    } catch (error) {
      console.error(error);
      throw new Error("Error sending email");
    }
  };

  const setNewPass = async (req,res) => {

    const { otp , password } = req.body;

    console.log("otp and pass", otp + password);
    if (!otp || !password) {
        return res.status(400).json({ message: "OTP and password are required." });
    }

    try {

        const user = await userModel.findOne({otp : otp}); 
        if(user){
            const newPass =  await bcrypt.hash(password,10);
            await userModel.findByIdAndUpdate({_id: user._id}, {$set: {password: newPass, otp: ""}}, {new : true});
           console.log("newPass" , newPass);
           return res.status(200).json({ message: "password has been successfully updated!" });    
        } else {
          res.status(200).json({ message: "this code has been expired!" });
        }
    } catch (error) {
        console.log(error);
        
    }
  }


  const jobApply = async (req,res) => {

    const {username, email, address, phonenumber, jobId} = req.body;

    const appliedUSer =  user({
        username : username,
        email : email,
        address : address,
        phoneNumber : phonenumber,
    })
     try {

        const job = await jobmodel.findOne({_id: jobId});

        if(job){

            await jobmodel.findByIdAndUpdate({_id:job._id},{$push : {appliedUser :  appliedUSer}});
            return res.status(200).json({message : "job has been successfully applied!"});

        } else {
          return  res.status(500).json({message : "job not found!"});        

        }
        
     } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong!"});        
        
     }




  }

  const getUserJob = async (req,res)=>{
    console.log("userId",req.userId);

    try {
      const jobs = await jobmodel.find({ userID : req.userId });

      if (jobs.length > 0) {
          return res.status(200).json({ jobs: jobs });
      } else {
          return res.status(404).json({ message: "No jobs found for the user." });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
  }
  }
module.exports = {signin , signup, resetPass, setNewPass, jobApply, getUserJob};