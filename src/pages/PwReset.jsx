import { Button, TextField } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { MyUserContext } from '../context/MyUserProvider'
import MyToastify from '../components/MyToastify'
import { FaHome } from 'react-icons/fa'

const PwReset = () => {


  const {msg, resetPassword} = useContext(MyUserContext)

  const navigate = useNavigate()

    const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    await resetPassword(data.get('email'))
    
    //signInUser(data.get('email'), data.get('password'))
    //navigate('/recipes')
  }


  return (
    <div style={{minHeight:'100vh', display:'flex', justifyContent:'center', gap:'20px',alignItems:'center', backgroundColor:'lightyellow', position:'relative'}}>
      <div className='login' style={{textAlign:'center', display:'flex',  flexDirection:'column', gap:'200px', justifyContent:'center', alignItems:'center', flexWrap:'wrap', gap:'10px',   backgroundColor:'white', borderRadius:'10px', padding:'40px', height:'fit-content'}}>
        <div style={{paddingBottom:'40px', fontSize:'xx-large', fontWeight:'bold'}}>Új jelszó igénylése</div>
        <form onSubmit={handleSubmit}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'20px'}}>
            <TextField style={{width:'310px'}} className='inputok' variant="outlined" type='email' label="Email" name='email' required/>
            <div className='hoverke' style={{position:'relative'}}>
              <Button style={{opacity:'1'}} className='glass-btnka'>Link küldése</Button>
              <button className='hoverke' style={{opacity:'1', position:'absolute', left:'0', top:'0', width:'100%', height:'100%', zIndex:'5', opacity:'0'}}>a</button>
            </div>
            {/* {msg && msg?.err && <p>{msg.err}</p>} */}
            {msg && <MyToastify {...msg} />}
          </div>
        </form>
      </div>
      <div className='glass-btn' onClick={()=>navigate("/")}><FaHome fill='black'/></div>
    </div>
  )
}

export default PwReset
