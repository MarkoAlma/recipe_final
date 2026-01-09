import axios from "axios";
import imageCompression from "browser-image-compression";

const API_URL="https://recipe-backend-puce.vercel.app/api/"

//const API_URL="https://receptek-backend.vercel.app/api/"

const convertToBase64=(file)=>{
    return new Promise((resolve,reject)=>{
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>resolve(reader.result)
        reader.onerror=(error)=>reject(error);//ha sérült a fájl a Promise reject-je hívódik meg

    })
}

//feltöltés:
export const uploadImage=async (file)=>{
    try {
        console.log("ÉRKEZIK A FILE");
        
        const compressed=await imageCompression(file,{maxSizeMB:1,maxWidthOrHeight:800,useWebWorker:true})
        const base64=await convertToBase64(compressed)
                console.log(API_URL+"uploadImage");
        const resp=await axios.post(API_URL+"uploadImage",{image:base64})

        
        return resp.data//url, pubil_id
        
    } catch (error) {
        console.log("Upload failed:",error);
        return null;   
    }
}
//törlés ha ismerjük a public_id-t:
export const deleteImage=async (public_id)=>{
    console.log(public_id);
    try {
       const resp=await axios.post(API_URL+"deleteImage",{public_id}) 
       console.log(resp.data);
       return resp.data
        
    } catch (error) {
        console.log('a fotó törlése a Cloudinary-ról nem sikerült:',error);
        
    }
    
}