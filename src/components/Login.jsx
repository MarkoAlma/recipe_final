import { Button } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { MyUserContext } from '../context/MyUserProvider'

const Login = () => {

  const {user, logoutUser, setMsg} = useContext(MyUserContext)
  
  const navigate = useNavigate()

  return (
    <div className='header' style={{display:'flex', justifyContent:'space-between', flexDirection:'row', padding:'10px', top:'0', left:'0', position:'absolute'}}>
        <div className='glass-btnka haza' onClick={()=>navigate("/")}>
            <FaHome fill='black'/>
        </div>
        {user ? <div style={{display:'flex', gap:'20px'}}>
                      {user?.photoURL && (
                <img style={{width:"50px",height:"50px",borderRadius:"50%",objectFit:"cover"}} src={user.photoURL} alt="profilkép" />
            )}
            <div onClick={()=>navigate("/userProfile")} style={{display:'flex', cursor:"pointer", alignItems:'center', justifyContent:'center', fontWeight:'bold'}}>{user.displayName}</div>
            <Button onClick={()=>logoutUser()} className='glass-btnka szove kij'>Kijlentkezés</Button>
        </div> :
        <div style={{display:'flex', gap:'20px'}}>
            <Button onClick={() => { navigate("/signin"); setMsg({});}}className='glass-btnka szove' >Bejelentezés</Button>
            <Button onClick={() => { navigate("/signup"); setMsg({}); }} className='glass-btnka szove' >Regisztráció</Button>
        </div>}
    </div>
  )
}

export default Login
