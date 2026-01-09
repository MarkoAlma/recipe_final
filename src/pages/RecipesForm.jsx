import React from 'react'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router';
import { addRecipe, readRecipe, updateRecipe } from '../myBackend';
import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import UploadButton from '../components/UploadButton';
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';

export const RecipesForm = () => {

  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState([""])
  const [steps, setSteps] = useState("")
  const [categ, setCateg] = useState("")
  const [file, setFile] = useState(null)
  const [filePrev, setFilePrev] = useState(null)
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const {user} = useContext(MyUserContext)

  const navigate = useNavigate()

  const {id} = useParams()
  
  useEffect(()=>{
    if (id) readRecipe(id, setRecipe)
  },[id])

  useEffect(()=>{
    if (recipe) {
      setName(recipe.name)
      setCateg(recipe.categ)
      setFilePrev(recipe.url)
      setIngredients(recipe.ingredients)
      setSteps(recipe.steps)
    }
  },[recipe])



  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let inputData = {name, ingredients, steps, categ, uid:user.uid}
    

    if (id) {
      await updateRecipe(id, !file ? {...inputData, url:recipe.url, delete_url:recipe.delete_url} : inputData,file)
    }else {
      await addRecipe(inputData, file)
    }
    setName('')
    setCateg('')
    setSteps('')
    setIngredients([])
    setFile(null)

    setLoading(false)
    navigate("/recipes")
  }

  const handleChangeIngredients = (ind, value)=> {
    const newIngredients = [...ingredients]
    newIngredients[ind] = value
    setIngredients(newIngredients)
  }

  const handleFileChange = (e)=>{
    const selected = e.target.files[0]

    setFile(selected || null)
    if (selected) {
      setFilePrev(URL.createObjectURL(selected))
    }else {
      setFilePrev(null)
    }
  }

  return (
    
    <div className='recipesform' style={{minHeight:'100vh', backgroundColor:'lightyellow', position:'relative', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>

      <div className='hozzaado' >
        <form onSubmit={handleSubmit} style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'15px'}}>
          <TextField className='inputok' variant="outlined" type='text' label="Recept neve" value={name} onChange={(e)=>setName(e.target.value)} required/>
          {ingredients.map((item, index)=> 
            <div className='inputok' key={index}>
              <TextField className='inputok' style={{width:'100%'}} variant="outlined" type="text" value={item} onChange={(e)=>handleChangeIngredients(index, e.target.value)} placeholder={`${index+1}. hozzávaló`}/>
            </div>
          )}
          <div onClick={()=>setIngredients([...ingredients,""])} style={{cursor:'pointer', boxShadow:'1px 1px 5px 2px lightgray', borderRadius:'5px', padding:'5px', margin:'0px', height:'26px', display:'flex', alignItems:'center', justifyContent:'center'}}> <FaPlus /></div>
          <textarea className='inputok' value={steps} onChange={(e)=>setSteps(e.target.value)} placeholder='Elkészítés lépései'  required></textarea>
          <TextField className='inputok' variant="outlined" value={categ} onChange={(e)=>setCateg(e.target.value)} placeholder='Kategória' required/>
          <div style={{ minHeight: '50px', width: '100%', display:'flex', alignItems:'center', justifyContent:'center'}}>

<UploadButton handleFileChange={handleFileChange} />

          {/* <div style={{ minHeight: '50px', width: '100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
  <button onClick={() => document.getElementById('fileInput').click()}>Fájl kiválasztása</button>
  <input
    id="fileInput"
    style={{ display: 'none' }}
    type="file"
    accept="image/*"
    onChange={handleFileChange}
   required/>
</div> */}

</div>
          {filePrev && <img src={filePrev} alt='kép' className='prevKep' style={{maxHeight:200, objectFit:'cover'}}/>}
          <Button type='submit' disabled={!file && !filePrev}>Mentés</Button>
        </form>
      </div>
      <div className='glass-btn' onClick={()=>navigate("/recipes")} ><IoMdClose fill='white' size={18}/> </div>
    </div>
  )
}