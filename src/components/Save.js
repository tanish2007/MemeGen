import "./Save.css"
import axios from "axios"
import {AppBar,Button,Stack,Toolbar, Typography} from "@mui/material"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router"

const Save = () => {


    const[memes,setMemes]=useState([])
    const username = localStorage.getItem("username")
    const navigate = useNavigate()
    
    const logout = () =>{
        localStorage.removeItem("username")
        navigate("/")
      }

    useEffect(()=>{
    
        axios.post("http://localhost:8000/getMemes",{username})
        .then((res)=>{
            console.log("getting meme",res)
            if(res.data.savedmemes!=[]){
            setMemes(res.data.savedmemes)
            }
        }).catch((e)=>console.log(e))
        },[])

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


  return (
    <div className='Container1-save'>
    <AppBar position="static">
          <Toolbar style={{ backgroundColor: '#2C4A52' }}>
            <img src='../../meme.jpg' className='panda_save' alt='Meme Logo' />
            <Typography variant="h6" style={{ marginLeft: '10px',fontWeight: 1000,marginTop: '-10px' }}>
              MemeGen
            </Typography>

            <Stack direction='row' spacing={30}>
              <Button color='inherit' style={{marginLeft: '120px',fontWeight: 1000}}><Link to={'/home'} style={{color:'white',textDecoration:'none'}}>Home</Link></Button>
              <Button color='inherit' style={{fontWeight: 1000}}><Link to={'/save'} style={{color:'white',textDecoration:'none'}}>Saved Memes</Link></Button>
              <Button color='inherit' style={{marginLeft: '300px',fontWeight: 1000}} onClick={logout}>Log Out</Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <h1 className="save_head">
            Saved Memes
        </h1>

        <div className="image-grid1">
            {memes.map((url1)=>{
                return<>
                <div>
                <img src={url1} className="meme1"></img>
                <button className="save1" onClick={()=>delmeme(url1)}>Delete</button>
                </div>
                </>
            })}
        </div>
    </div>
  )
}

export default Save