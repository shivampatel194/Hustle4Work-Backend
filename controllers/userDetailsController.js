const userModel = require("../models/userData");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;


const createUserData = async (req,res)=> {
    console.log("check");
    console.log(req.userId);

    const {username, email, phoneNumber, address, qualification, skills, experience} = req.body;

 const newData = new userModel ({
    _id: req.userId,
    username : username,
    email : email,
    phoneNumber : phoneNumber,
    address : address,
    qualification : qualification,
    skills : skills,
    experience : experience
 });
    
 try {
    
    const savedUser = await newData.save();
    console.log(savedUser);
    
    res.status(201).json(savedUser);


 } catch (error) {
    console.log(error);
    res.status(500).json({message : "Something went wrong!"});
    
 }

}

const deleteUserData = async (req,res)=> {
const id = req.params.id;

try {
    const user = await userModel.findByIdAndRemove(id);
    res.status(202).json(user);
} catch (error) {
    
    console.log(error);
    res.status(500).json({message : "Something went wrong!"});
}


}

const updateUserData = async (req, res) => {
    const id = req.params.id;   
    const { username, email, phoneNumber, address, qualification, skills, experience } = req.body;

    const newData = {
        username,
        email,
        phoneNumber,
        address,
        qualification,
        skills,
        experience
    };

    try {
        const updatedData = await userModel.findByIdAndUpdate(id, newData, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}

const getAllUserData = async (req,res) => {

    const userId = req.userId;
    console.log("userId", typeof userId);


    try {
        const userData = await userModel.findById({ _id: userId });
        console.log("userData", userData);
      
        if (userData) {
          res.status(200).json(userData);
        } else {
          console.log("User not found");
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
      }
}

module.exports = {
    createUserData,deleteUserData,updateUserData,getAllUserData
}