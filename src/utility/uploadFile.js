import axios from "axios"

//Egy file feltöltése(avatar használathoz)
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

export const uploadFileToAd = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "hunix");

  const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

  try {
    const response = await axios.post(url, formData);
    return response.data.secure_url;  // csak a string URL!
  } catch (error) {
    console.log(error);
  }
};


const url = "https://hunix-backend.onrender.com"

export const delPhoto = async (publicId) => {
  console.log("Attempting to delete:", publicId); // Debug log
  
  try {
    const response = await axios.delete(
      'http://localhost:3000/api/delete-image',
      {
        data: { publicId },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log("Deletion response:", response.data);
    return response.data;
    
  } catch (error) {
    console.error("Full deletion error:", {
      message: error.message,
      response: error.response?.data,
      request: error.config?.data
    });
    throw error;
  }
};