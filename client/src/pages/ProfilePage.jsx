import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import assets from '../assets/assets.js'
import {AuthContext} from '../context/AuthContext.jsx'

const ProfilePage = () => {

  const {authUser, updateProfile} = useContext(AuthContext);
  

const[selectedImage, setSelectedImage] = useState(null);
const[name, setName] = useState(authUser.fullName);
const[bio, setBio] = useState(authUser.bio);

const navigate = useNavigate();

const handleSubmit = async(e)=>{
  e.preventDefault();
  if(!selectedImage){
    await updateProfile({fullName:name, bio});
    navigate('/');
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(selectedImage);
  reader.onload = async()=>{
    const base64Image = reader.result;
    await updateProfile({profilePic: base64Image, fullName:name, bio});
    navigate('/');
  }
}

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>

       <div className=' w-3/4 sm:w-full max-w-2xl backdrop-blur-2xl text-white border-2 border-pink-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
          <input onChange={(e)=>setSelectedImage(e.target.files[0])} type="file" id="avatar" accept='.png, .jpg, .jpeg' hidden/>
          <img src={selectedImage? URL.createObjectURL(selectedImage): assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImage && 'rounded-full'}`}/>
          Upload Profile Image
          </label>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" required placeholder='Your Name' className='p-2 border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400'/>
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4} placeholder='Enter your bio' required className='p-2 border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400'></textarea>
          <button className="bg-gradient-to-r from-pink-500 to-[#FF8C42] text-white p-2 rounded-full text-lg cursor-pointer" type='submit'>Save</button>
        </form>

        <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImage && 'rounded-full'}`} src={authUser.profilePic || assets.logo_icon} alt="" />

       </div>

    </div>
  )
}

export default ProfilePage
