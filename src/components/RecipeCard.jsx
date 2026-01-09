import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteRecipe } from '../myBackend';
import { CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';

const RecipeCard = ({id, name, steps, ingredients, categ, url, delete_url, uid}) => {

    const navigate = useNavigate()
    const {user} = useContext(MyUserContext)

  return (
    <div className='kartya' style={{flexBasis:'24%', display:'flex', flexDirection:'column', backgroundColor:'rgb(250,250,250) ', boxShadow:'1px 1px 5px 2px lightgray', borderRadius:'10px', position:'relative', padding:'10px', paddingBottom:"50px"}}>
      <h1>{name}</h1>
        <h6>({categ})</h6>
    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}><img src={url} alt={name} style={{height:'160px', maxWidth:'250px', objectFit:'cover', paddingTop:'15px', paddingBottom:'15px'}}/></div>
    <div className='etel'>
      <ul>
          <h3 style={{textAlign:'left'}}>Hozzávalók:</h3>
          {ingredients.map((obj, ind) => 
              <li key={ind} style={{textAlign:'left'}}>{obj}</li>
          )}
      </ul>
      <h3 style={{textAlign:'left'}}>Elkészítés:</h3>
      <p style={{textAlign:'left', marginBottom:"20px"}}>{steps}</p>
    </div>
    {user && user.uid == uid &&
      (<> <div className='glass-btnk balos' style={{cursor:'pointer'}} onClick={()=>deleteRecipe(id, delete_url)}><FaRegTrashAlt/></div>
      <div className='glass-btnk jobbos' style={{cursor:'pointer'}} onClick={()=>navigate("/edit/"+id)} ><CiEdit/></div></>) }
    </div>
  )
}

export default RecipeCard
