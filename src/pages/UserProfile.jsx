import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Button } from '@mui/material'
import Login from '../components/Login'
import { deleteAvatar } from '../myBackend'

export const UserProfile = () => {
    const {user,avatarUpdate,deleteAccount}=useContext(MyUserContext)
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

   

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        if (selected) {
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleSubmit=async (e)=>{
        e.preventDefault()
        setLoading(true)
        if(!file) return
        try {
            await avatarUpdate(file)
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
            setPreview(null)
        }
    }

    const handleDelete=async ()=>{
        if(window.confirm('Biztosan ki szeretnéd törölni a felhasználói fiókodat?')){
            const pw=prompt("Add meg a jelszavad a fiók törléséhez!")
            await deleteAccount(pw)
            await deleteAvatar(user.uid)
        }
    }
  return (

    <div style={{minHeight:'100vh', display:'flex', justifyContent:'center', gap:'20px',alignItems:'center', backgroundColor:'lightyellow', position:'relative'}}> 
              <div className='login' style={{textAlign:'center', display:'flex',  flexDirection:'column', gap:'200px', justifyContent:'center', alignItems:'center', flexWrap:'wrap', gap:'10px',   backgroundColor:'white', borderRadius:'10px', padding:'40px', height:'fit-content'}}>
                <div style={{paddingBottom:'20px', fontSize:'xx-large', fontWeight:'bold'}}>Profil módosítása</div>

        <div>
            <h3><span style={{fontWeight:'normal'}}>Felhasználónév:</span> {user?.displayName}</h3>
            <h3 style={{paddingBottom:'20px'}}><span style={{fontWeight:'normal'}}>Email cím:</span> {user.email}</h3>
            {user?.photoURL && (
                <img style={{width:"50px",height:"50px",borderRadius:"50%",objectFit:"cover"}} src={user.photoURL} alt="profilkép" />
            )}
        </div>

        <form style={{display:'flex', flexDirection:'column', gap:'20px'}} onSubmit={handleSubmit}>
             <input type="file" accept="image/*" onChange={handleFileChange}/>
             <Button type="submit" disabled={loading || !file}>{loading? "Mentés...": "Profil frissítése"}</Button>
         </form> 
         <Login/>
            {preview && (
                <img  src={preview}  alt="Előnézet" style={{width:"50px",height:"50px",borderRadius:"50%",objectFit:"cover"}}/>
            )}

            <Button onClick={handleDelete} style={{position:"fixed",bottom:"5px",right:"5px",backgroundColor:"red", color:'white'}}>Fiók törlése</Button>
            </div>
      </div>

  )
}

