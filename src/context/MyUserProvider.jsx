import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import {auth} from '../firebaseApp'
import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { uploadImage } from '../cloudinaryUtils'

export const MyUserContext = createContext()

const MyUserProvider = ({children}) => {
  
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState({})

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(currentUser)=>{
      console.log(currentUser);
      currentUser && setUser(currentUser) //ezt kell majd modositani
      user && console.log(user);
    })
    return ()=>unsub()
  },[user])

  const signUpUser = async (email, password, display_name, setLoading)=> {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, {displayName:display_name})
      await sendEmailVerification(auth.currentUser)
      setMsg(prev => delete prev.err)
      //setMsg({signUp:"Kattints az emailben érkezett aktiváló linkre"})
      setMsg({katt:"Kattints az emailben érkezett aktiváló linkre"})
    } catch (error) {
      console.log(error);
      setMsg({err:error.message})
    }finally {
      setLoading(false)
    }
  }

  const logoutUser = async ()=> {
    await signOut(auth)
    setMsg({kijelentkezes:'Sikeres kijelentkezés!'})
     setUser(null)
  }

  const signInUser = async (email, password) => {
    setUser(null)
    try {
      const adat = await signInWithEmailAndPassword(auth, email, password)
      if (adat.user.emailVerified) {
        setMsg({signIn:true, kijelentkezes:'Sikeres bejelentkezés!'})
      }else {
        setMsg({err:"Nincs megerősítve az email!"})
            setUser(null)
      }
      //
    } catch (error) {
      console.log(error);
      setMsg({err:error.message})
    }
  }

  const resetPassword = async (email)=> {
    let success = false
    try {
      await sendPasswordResetEmail(auth, email)
      setMsg({resetPw:"A jelszó visszaállításhoz szükséges email elküldve"})
      success = true
    } catch (error) {
      setMsg({err:error.message})
    }finally {
      if (success) {
        //navigate("/signin")
      }
    }
  }

//avatar update:
 const avatarUpdate=async (file)=>{
  try {    
    const uploadResult=await uploadImage(file)
    if(uploadResult?.url) await updateProfile(auth.currentUser,{photoURL:uploadResult.url})
      //el kell tárolni a public_id-t:
    // await updateAvatar(user.uid,uploadResult.public_id)
    setUser({...auth.currentUser}) //frissítjük a lokális state-t
    setMsg(null)
    setMsg({kijelentkezes:"Sikeres profilmódosítás!"})
  } catch (error) {
    setMsg({err:error.message})
  }
 }

 const deleteAccount=async (password)=>{
  try {
    const credential=EmailAuthProvider.credential(auth.currentUser.email,password)
    await reauthenticateWithCredential(auth.currentUser,credential)
    await deleteUser(auth.currentUser)
    setMsg(null)
    setMsg({torles:"Felhasználói fiók törölve!"})
    setUser(null)
  } catch (error) {
    console.log(error);
    if(error.code=="auth/wrong-password") setMsg({err:"Hibás jelszó!"})
    else setMsg({err:"Hiba történt a fiók törlésekor!"})
    
  }
 }


  return (
    <MyUserContext.Provider 
      value={{user,signUpUser,logoutUser,signInUser,msg,setMsg,resetPassword,avatarUpdate,deleteAccount}}>
      {children}
    </MyUserContext.Provider>
  )
}

export default MyUserProvider
    