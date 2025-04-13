import axios from "axios"

export const uploadFile = async (file) => {
    const formData = new FormData()
    console.log(formData);
    formData.append("file",file)
    formData.append("upload_preset",import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    formData.append("folder","hunix")
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`
    //console.log(formData);
    try {
        const response = await axios.post(url,formData)
        //console.log(url+"\n"+response.data.secure_url+"\n"+response.data.public_id);
        return {url:response.data.secure_url}
    } catch (error) {
        console.log(error);
        
    }
}


const url = "https://hunix-backend.onrender.com"

export const delPhoto=async (id) => {
    console.log(id);
    try {
        await axios.delete(`${url}/post/${id}`)
    } catch (error) {
        console.log(error);
        
    }
}