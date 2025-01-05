import { use, useState } from 'react'
import './Home.css'
import {AppBar,Button,Stack,Toolbar, Typography} from "@mui/material"
import axios from 'axios'

export default function Home(){

  const [prompt,setPrompt]=useState("")
  const[memevisible,setMemevisible]=useState(false)
  const [memeurl,setMemeUrl]=useState("")

  const handlePrompt = (e) =>{
    setPrompt(e.target.value)
  }
  const handleMeme = ()=>{

    if (prompt!==""){
      setMemevisible(true)
      console.log("hello")
    axios.post("http://localhost:8000/generateMeme",{prompt}).then((res)=>{
      console.log("got the message")
      setMemeUrl(res.data.imageUrl);
      setMemevisible(true);
    })
    .catch((e)=>{
      console.log(e)
    })
  }
      
  }
    return <>
    {/* <div className='Container'> */}
      <div className='Container1'>
      <AppBar position="static">
            <Toolbar>
              <img src='../../meme.jpg' className='panda' alt='Meme Logo' />
              <Typography variant="h6" style={{ marginLeft: '10px',fontWeight: 1000,marginTop: '-10px' }}>
                MemeGen
              </Typography>

              <Stack direction='row' spacing={30}>
                <Button color='inherit' style={{marginLeft: '120px',fontWeight: 1000}}>Home</Button>
                <Button color='inherit' style={{fontWeight: 1000}}>Saved Memes</Button>
                <Button color='inherit' style={{marginLeft: '300px',fontWeight: 1000}}>Log Out</Button>
              </Stack>
            </Toolbar>
          </AppBar>
            <div class="image-container">
              <img src='../../images1.jpeg' className='promptimg'></img>
            
              <input placeholder='Enter Your Prompt' className='prompt' onChange={handlePrompt}/>
              <button className='prompt1' onClick={handleMeme}>Generate</button>
            </div>
            
            {memevisible && 
            <>
            (<h1 style={{textAlign: 'center',fontWeight: 900,color:'#c88904'}}>Generated Memes</h1>
            <div class="image-grid">
            <img src={memeurl} className='meme'></img>
            
          </div>)
          </>}
            
      </div>
    {/* </div> */}
    </>

}