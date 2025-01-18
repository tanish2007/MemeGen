import { use, useEffect, useState } from 'react'
import './Home.css'
import {AppBar,Button,Stack,Toolbar, Typography} from "@mui/material"
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


export default function Home(){

  const [prompt,setPrompt]=useState("")
  const[memevisible,setMemevisible]=useState(false)
  const [memeurl,setMemeUrl]=useState([])
  const[memes,setMemes]=useState([])
  const navigate = useNavigate()

  const handlePrompt = (e) =>{
    setPrompt(e.target.value)
  }

  const username = localStorage.getItem('username')

  useEffect(()=>{
    
    axios.post("http://localhost:8000/getMemes",{username})
    .then((res)=>{
        console.log("getting meme",res)
        if(res.data.savedmemes!=[]){
        setMemes(res.data.savedmemes)
        }
    }).catch((e)=>console.log(e))
    },[])


  const savememe = (url1) =>{
    console.log("saving",username,url1)
    const newlist = [...memes,url1]
    console.log(newlist)
    setMemes(newlist)
    console.log("mem",memes)
    const user = {username:username,memelist:newlist}
    axios.post("http://localhost:8000/updateMemes",user)
    .then((res)=>{
        console.log(res.data)
    })
    .catch((e)=>console.log(e))
  }

  const delmeme = (url1) =>{
    console.log(url1)
   const newmeme = memes.filter((m) => m!=url1)
   
   setMemes(newmeme)
   console.log(memes)
   const user={username:username,memelist:newmeme}
   axios.post("http://localhost:8000/updateMemes",user)
.then((res)=>{
console.log("deleting",res.data)
})
.catch((e)=>console.log(e))
}

  const logout = () =>{
    localStorage.removeItem("username")
    navigate("/")
  }

  const handleMeme = ()=>{

    if (prompt!==""){
      setMemevisible(true)
      console.log("hello")
    axios.post("http://localhost:8000/generateMeme",{prompt}).then((res)=>{
      console.log("got the message")
      // console.log(res)
      setMemeUrl(res.data.urls);
      console.log(memeurl)
      setMemevisible(true);
    })
    .catch((e)=>{
      console.log(e)
    })
  }

  
      
  }
    return <>
      <div className='Container1_home'>
      <AppBar position="static">
            <Toolbar style={{ backgroundColor: '#2C4A52' }}>
              <img src='../../meme.jpg' className='panda_home' alt='Meme Logo'  />
              <Typography variant="h6" style={{ marginLeft: '10px',fontWeight: 1000,marginTop: '-2px' }}>
                MemeGen
              </Typography>

              <Stack direction='row' spacing={30}>
              <Button color='inherit' style={{marginLeft: '100px',fontWeight: 1000}}><Link to={'/home'} style={{color:'white',textDecoration:'none'}}>Home</Link></Button>
              <Button color='inherit' style={{fontWeight: 1000}}><Link to={'/save'} style={{color:'white',textDecoration:'none',marginLeft: '100px'}}>Saved Memes</Link></Button>
              <Button color='inherit' style={{marginLeft: '400px',fontWeight: 1000}} onClick={logout}>Log Out</Button>
              </Stack>
            </Toolbar>
          </AppBar>
            <div class="image-container_home">
              <img src='../../images1.jpeg' className='promptimg_home'></img>
            
              <input placeholder='Enter Your Prompt' className='prompt_home' onChange={handlePrompt}/>
              <button className='prompt1_home' onClick={handleMeme}>Generate</button>
            </div>
            
            {memevisible && 
            <>
            (<h1 style={{textAlign: 'center',fontWeight: 900,color:'#fed106'}}>Generated Memes</h1>
            <div class="image-grid_home">

            {memeurl.map((url1)=>{
              return <>
              <div className='generated'>
                <img src={url1} className='meme_home'></img>
                
                {memes.includes(url1) ? (
         
         <button className='save_home' onClick={()=>delmeme(url1)}> <RemoveCircleIcon />
         </button>
        ) : (
          <button className='save_home' onClick={()=>savememe(url1)}> <SaveAltIcon />
         </button>
          
        )}
                  
              </div>
              </>

            })}
            
          </div>)
          </>}
            
      </div>
    </>

}