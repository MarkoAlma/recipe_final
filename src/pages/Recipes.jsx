import { Button, CircularProgress } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaHome, FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router';
import { readRecipes } from '../myBackend';
import RecipeCard from '../components/RecipeCard';
import Login from '../components/Login';
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';

export const Recipes = () => {

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(null)


  const {user} = useContext(MyUserContext)

  const navigate = useNavigate()

  useEffect(()=>{
    setLoading(true)
    readRecipes(setRecipes, setLoading)
  },[])

  return (
    <div style={{minHeight:'100vh', display:'flex', justifyContent:'center' , flexDirection:'column', backgroundColor:'lightyellow', position:'relative'}}>
      <Login/>
      <div className='padd' style={{textAlign:'center', display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'10px', padding:'70px'}}>
        {loading && <CircularProgress />}
         {recipes && recipes.length>0 && recipes.map(obj=> <RecipeCard key={obj.id} {...obj}/> )} {recipes && recipes.length==0 && loading == false && <h4>Nincsenek receptek feltöltve</h4> }</div>
      { <Button onClick={()=>user ? navigate("/addnew") : navigate("/signin")} style={{position:'absolute', bottom:'5px', right:'5px', cursor:'pointer'}}>Új recept hozzáadása</Button>}
    </div>
  )
}