 const { Configuration, OpenAI } = require("openai");
 const axios= require('axios')
 const openai = new OpenAI({
    apiKey: "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",
  });
exports.generateMeme=async(req,res,next)=>{
    const user_prompt = req.body.prompt;
    console.log(user_prompt)
    
    await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {"role": "user", "content": `Create a funny meme text for the Drakeposting meme template based on the prompt: ${user_prompt}`},
        ],
      }).then((result) => {
        response=(result.choices[0].message).content
        console.log(response)
        let matches = response.match(/"([^"]*)"/g);
        console.log("m",matches)
        let phrases = matches.map(text => text.replace(/"/g, ''));
        console.log("p",phrases)
    
        let memeBody = new URLSearchParams();
        memeBody.append("template_id", "181913649");  // Drakeposting template
        memeBody.append("username", "JiyaGupta");
        memeBody.append("password", "Vani@0912");
        memeBody.append("text0", phrases[0]);  // Top text
        memeBody.append("text1", phrases[1]);  // Bottom text
        axios.post("https://api.imgflip.com/caption_image",memeBody)
        .then(resp=>{
            console.log("Done creating image")
            console.log(resp.data.data)
            ans=resp.data.data
            res.status(200).json({ans})})
        .catch(e=>{
            console.log(e)
            res.status(500).json({message:"Caption Issue"})
        }
        )
    }).catch(e=> console.log(e))
   
  
    
}





