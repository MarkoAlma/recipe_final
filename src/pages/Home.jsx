import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import Login from '../components/Login'

export const Home = () => {

  const navigate = useNavigate()

  return (
    <div className='home' style={{position:'relative'}}>
      <div className='kisdiv'>
        <h1 style={{color:'#32b0b9ff'}}>RecipeBook</h1>
        <Button style={{color:'white'}} onClick={()=>navigate("/recipes")}>Főzz, posztolj, inspirálj !</Button>
        <Login/>
        
      </div>
    </div>
  )
}