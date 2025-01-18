const axios = require("axios");
const { OpenAI } = require("openai");
const User = require("../model/User");


// const openai = new OpenAI({
//   apiKey:  // Replace with your actual OpenAI API key
// });

exports.generateMeme = async (req, res,next) => {
  const user_prompt = req.body.prompt;
  const urls = [];

  try {
    // Generate meme text for "Drakeposting" meme
    const drakeResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Create a funny meme text for the "Drakeposting" meme template based on the prompt: ${user_prompt}`,
        },
      ],
    });

    const drakeMemeText = drakeResponse.choices[0].message.content;
    const drakePhrases = drakeMemeText
      .match(/"([^"]*)"/g)
      .map((text) => text.replace(/"/g, ""));

    // Generate Drakeposting meme
    const drakeMemeBody = new URLSearchParams({
      template_id: "181913649", // Drakeposting template ID
      username: "JiyaGupta",
      password: "Vani@0912",
      text0: drakePhrases[0], // Top text
      text1: drakePhrases[1], // Bottom text
    });

    const drakeMemeResponse = await axios.post(
      "https://api.imgflip.com/caption_image",
      drakeMemeBody
    );

    urls.push(drakeMemeResponse.data.data.url);

    // Generate meme text for "Distracted Boyfriend" meme
    const boyfriendResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Create a funny meme text for the "Distracted Boyfriend" meme template based on the prompt: ${user_prompt}`,
        },
      ],
    });

    const boyfriendMemeText = boyfriendResponse.choices[0].message.content;
    const boyfriendPhrases = boyfriendMemeText
      .match(/"([^"]*)"/g)
      .map((text) => text.replace(/"/g, ""));

    // Generate Distracted Boyfriend meme
    const boyfriendMemeBody = new URLSearchParams({
      template_id: "112126428", // Distracted Boyfriend template ID
      username: "JiyaGupta",
      password: "Vani@0912",
      text0: boyfriendPhrases[0], // Top text
      text1: boyfriendPhrases[1], // Bottom text
    });

    const boyfriendMemeResponse = await axios.post(
      "https://api.imgflip.com/caption_image",
      boyfriendMemeBody
    );

    urls.push(boyfriendMemeResponse.data.data.url);

    const twobuttons = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Create a funny meme text for the "Two-Buttons" meme template based on the prompt: ${user_prompt}`,
        },
      ],
    });
    const twobuttonstext = twobuttons.choices[0].message.content;
    const twobuttonsphrases = twobuttonstext
      .match(/"([^"]*)"/g)
      .map((text) => text.replace(/"/g, ""));

      const twobuttonsMemeBody = new URLSearchParams({
        template_id: "87743020", 
        username: "JiyaGupta",
        password: "Vani@0912",
        text0: twobuttonsphrases[0], // Top text
        text1: twobuttonsphrases[1], // Bottom text
      });

      const twobuttonsMemeResponse = await axios.post(
        "https://api.imgflip.com/caption_image",
        twobuttonsMemeBody
      );
  
      urls.push(twobuttonsMemeResponse.data.data.url);

    console.log(urls)
    // Send URLs back to the frontend
    res.status(200).json({urls});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while generating memes." });
  }
};

exports.updateMeme = async(req,res,next) =>{

  try{
  const {username,memelist} = req.body
  console.log("usernamegetting",username,memelist)

  const existingUser = await User.findOne({username})

  existingUser.saved = memelist

  const newUser = await existingUser.save();

  return res.status(200).json({newUser})
  }
  catch(e){
    console.log(e)
  }

}

exports.getMeme = async(req,res,next) =>{

  
  try{
  const {username} =  req.body
 
  const existingUser = await User.findOne({username})
  console.log(existingUser)

  if(existingUser.Savedmemes==[]){
    return res.status(200).json({message:"no meme saved till now",savedmemes:[]})
  }
  return res.status(200).json({message:"no meme saved till now",savedmemes:existingUser.saved})
  }
  catch(e){
    console.log(e)
  }
}