const User= require('../model/User')
const bcrypt = require('bcrypt');


exports.createUser= async (req,res,next)=>{
   
    const { username, password } = req.body;
    console.log(req.body)
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username,password: hashedPassword });
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists.' });
    }
    try{
        const saveduser= await newUser.save();
        res.status(200).json(saveduser)
    }
    catch(e){
        console.log(e)
        res.status(500).json("Error")
    }
    
}

exports.authenticateUser= async (req,res,next)=>{
   
    const { username, password } = req.body;
    console.log(req.body)
    
    try{
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json("Logged in Successfully");
    }
    catch(e){
        console.log(e)
        res.status(500).json("Error")
    }
    
}
