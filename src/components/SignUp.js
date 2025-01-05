import './SignUp.css'
import { Link } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'


export default function SignUp(){
    const [username,setUsername]=useState("")
    const [password, setPassword]=useState("")
    const createAccount = async ()=>{
        console.log("here")
        const user={username:username,password:password}
        axios.post("http://localhost:8000/createUser",user)
        .then(res=>console.log(res))
        .catch(e=>console.log(e))
    }
    return <>
    
    <div className='Heading'>
        <img src="../../meme.jpg" alt="My Image" className='panda' />
        <h1 className='h1'>MemeGen1</h1>
    </div>
        <div className='Container'>
            <div className='Box'>
                <h1 className='login'>SignUp</h1>
                <h4 className='h2'>Username</h4>
    
                 <div className="input-container">
                    <input placeholder='Enter your username' className='i2' onChange={e => setUsername(e.target.value)}></input>
                </div>
                <h4 className='h2'>Password</h4>
    
                <div className="input-container">
                    <input placeholder="Enter your password" className="i2" onChange={e => setPassword(e.target.value)} type='password'/>
                </div>

                <h4 className='C5'>Confirm Password</h4>
    
                <div className="input-container">
                    <input placeholder="Enter password again" className="IC" type="password" />
                </div>
    
                 <div  className='log-container'>
                    <button className='log-button' onClick={createAccount}>Create An Account</button>
                 </div>
                   <h1 className='h3'>Already Have a account? <Link to={'/'} >Login</Link></h1>
    </div>
    </div>
    </>
}

