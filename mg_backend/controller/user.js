const User= require('../model/User')
const bcrypt = require('bcrypt');
const { Configuration, OpenAI } = require("openai");

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
const openai = new OpenAI({
    apiKey: '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',
  });

exports.generateMeme = async (req, res, next) => {
    console.log("Here meme")
    const { prompt } = req.body;
  
    try {
 
      const response = await openai.createImage({
        prompt: `A meme image with ${prompt}`,
        n: 1, 
        size: "512x512", 
      });
  
      const imageUrl = response.data.data[0].url;
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error("Error generating meme:", error.message);
      res.status(500).json({ message: "Failed to generate meme." });
    }
  };
