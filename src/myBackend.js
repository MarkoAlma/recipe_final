import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebaseApp";
import imageCompression from "browser-image-compression";
import { deleteImage } from "./cloudinaryUtils";

const apiKey = import.meta.env.VITE_IMGBB_API_KEY

const iurl = "https://api.imgbb.com/1/upload?key="+apiKey
export const uploadToIbb = async (file)=> {
    const formData =new FormData()
    formData.append("image", file)
    try {
        const resp = await axios.post(iurl, formData)
        const {url, delete_url} = resp.data.data
        return {url, delete_url}
    } catch (error) {
        console.log("Képfeltöltési hiba: ", error);
    }
}

export const addRecipe = async(recipe, file)=> {
    try {
        const compressed = await imageCompression(file, {maxWidthOrHeight:800, useWebWorker:true})
        const {url, delete_url} = await uploadToIbb(compressed)
        const collRef = collection(db, "recipes")
        await addDoc(collRef, {...recipe, url, delete_url, timestamp:serverTimestamp()})
    } catch (error) {
        console.log(error); 
    }
}

export const readRecipes = async (setRecipes, setLoading)=> {
    const collRef = collection(db, "recipes")
    const q = query(collRef, orderBy("timestamp", "desc"))
    const unsubscribe = onSnapshot(q,(snapshot)=> {
        //setRecipes(snapshot.docs.map(doc => doc.data()))
        setRecipes(snapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
        setLoading(false)
    })
    return unsubscribe
}

export const deleteRecipe = async (id, delete_url)=> {
    //await axios.get(delete_url)
    const docRef=doc(db, "recipes", id)
    await deleteDoc(docRef)
}

export const readRecipe = async(id, setRecipe)=>{
    const docRef = doc(db, "recipes", id)
    const docData = await getDoc(docRef)
    setRecipe(docData.data())
}

export const updateRecipe = async(id, updatedData, file)=> {
    let url = updatedData.url || ''
    let delete_url = updatedData.delete_url || ''
    try {
        if (file) {
            const compressed = await imageCompression(file, {maxWidthOrHeight:800, useWebWorker:true})
            const result = await uploadToIbb(compressed)
            url = result.url
            delete_url = result.delete_url
        }
        const docRef = doc(db, "recipes", id)
        await updateDoc(docRef, {...updatedData, url, delete_url, updatedAt:serverTimestamp()})
    } catch (error) {
        console.log("nem sikerült a módosítás:", error);
    }
}

export const deleteAvatar = async (uid)=> {
    console.log(uid);
    let publicId = null
    try {
        const docRef = doc(db, 'avatars', uid)
        const docSnap = await getDoc(docRef)
        if(!docSnap.exists())return
        else {
            publicId = docSnap.data().publicId
            await deleteImage(publicId)
            await deleteDoc(docRef)
        }
    } catch (error) {
        console.log("Avatar törlési hiba");
        
    }
}