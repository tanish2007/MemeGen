import './SignUp.css'
import { Link } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'


export default function SignUp(){
    const [username,setUsername]=useState("")
    const [password, setPassword]=useState("")
    const navigate = useNavigate()
    const createAccount = async ()=>{
        console.log("here")
        const user={username:username,password:password}
        axios.post("http://localhost:8000/createUser",user)
        .then((res)=>{
            console.log(res)
            navigate("/home")
        })
        .catch(e=>console.log(e))
    }
    return <>
    
    <div className='Heading_save'>
        <img src="../../meme.jpg" alt="My Image" className='panda_save' />
        <h1 className='h1_save'>MemeGen1</h1>
    </div>
        <div className='Container_save'>
            <div className='Box_save'>
                <h1 className='login_save'>SignUp</h1>
                <h4 className='h2_save'>Username</h4>
    
                 <div className="input-container_save">
                    <input placeholder='Enter your username' className='i2_save' onChange={e => setUsername(e.target.value)}></input>
                </div>
                <h4 className='h2_save'>Password</h4>
    
                <div className="input-container_save">
                    <input placeholder="Enter your password" className="i2_save" onChange={e => setPassword(e.target.value)} type='password'/>
                </div>
    
                 <div  className='log-container_save'>
                    <button className='log-button_save' onClick={createAccount}>Create An Account</button>
                 </div>
                   <h1 className='h3_save'>Already Have a account? <Link to={'/'} >Login</Link></h1>
    </div>
    </div>
    </>
}

