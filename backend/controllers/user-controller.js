import User from "../model/User.js";
import bcrypt from 'bcryptjs';

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find()       
    } catch (error) {
        return console.log(err)
    }
    if(!users){
        return res.status(404).json({message:"No users found"})
    }
    return res.status(200).json({users:users}) // or you can write json({users})
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({email:email})
    } catch (err) {
        return console.log(err)
    }
    if (existingUser){
        return res.status(400).json({message:"User already exists"})
    }

    
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]
    });
  
    try {
        await user.save()
    } catch (error) {
        return console.log(error) 
    }
    return res.status(201).json({user:user})
}

export const login = async (req, res,next) => {

    const { email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error)
    }
    if (!existingUser){
        console.log("User not found")
        return res.status(404).json({message:"User not found"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect){
        console.log("Incorrect Password")
        
        return res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({message:"Login successful",user:existingUser})

}