const userModel = require("../models/userData");

const createUserData = async (req,res)=> {
    console.log("check");
    console.log(req.userId);

    const {username, email, phoneNumber, address, qualification, skills, experience} = req.body;

 const newData = new userModel ({
    username : username,
    email : email,
    phoneNumber : phoneNumber,
    address : address,
    qualification : qualification,
    skills : skills,
    experience : experience,
    userId : req.userId
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

    try {
        const userData = await userModel.find();
        res.status(200).json(userData);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong!"});
        
    }

}

module.exports = {
    createUserData,deleteUserData,updateUserData,getAllUserData
}