import { useState } from 'react'
import './login.css'
import {Link, useNavigate} from 'react-router'
import axios from 'axios'



export default function Login(){
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate()

    const AuthenticateAccount = async ()=>{
        const user={username:username,password:password}
        axios.post("http://localhost:8000/authenticateUser",user)
        .then((res)=>{
            console.log(res)
            navigate("/home")
            localStorage.setItem('username',username)
        })
        .catch(e=>console.log(e))
    }
    return <>
    
    <div className='Heading'>
        <img src="../../meme.jpg" alt="My Image" className='panda' />
        <h1 className='h1'>MemeGen</h1>
    </div>
        <div className='Container'>
            <div className='Box'>
                <h1 className='login'>Login</h1>
                <h4 className='h2'>Username</h4>
    
                 <div className="input-container">
                 <input placeholder="Enter your password" className="i2" onChange={e => setUsername(e.target.value)} />
                </div>
                <h4 className='h2'>Password</h4>
    
                <div className="input-container">
                    <input placeholder="Enter your password" className="i2" onChange={e => setPassword(e.target.value)} type="password"/>
                </div>

                 <h5 className='f2'>Forgot Password?</h5>
    
                 <div  className='log-container'>
                    <button className='log-button' onClick={AuthenticateAccount}>Login</button>
                 </div>
                   <h1 className='h3'>Don't Have a account? <Link to="/SignUp">SignUp</Link></h1>
    </div>
    </div>
    </>
}

