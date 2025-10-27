import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from  '../context/AuthContext.jsx'
import { ChatContext } from '../context/ChatContext.jsx'

const Sidebar = () => {

   const {logout ,onlineUsers} = useContext(AuthContext);
   const{getUsers, users,selectedUser, setSelectedUser, unseenMessages, setUnseenMessages} = useContext(ChatContext);

   const navigate = useNavigate();

   const[input, setInput] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

   const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users

   useEffect(()=>{
     getUsers();
   },[onlineUsers])


  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser? "max-md:hidden":""}`}>
      <div className='pb-5'>
      
        <div className='relative py-2'>
          <img
            src={assets.menu_icon}
            alt="menu"
            className='max-h-5 cursor-pointer ml-auto'
            onClick={() => setMenuOpen(!menuOpen)}
          />

      
          {menuOpen && (
            <div className='absolute top-full right-0 z-50 w-32 p-5 rounded-md bg-[#FF8C42B2] border border-pink-600 text-white'>
              <p onClick={() => { navigate('/profile'); setMenuOpen(false); }} className='cursor-pointer text-sm'>Edit Profile</p>
              <hr className='my-2 border-t border-gray-500' />
              <p onClick={() => { logout(); setMenuOpen(false); }} className='cursor-pointer text-sm'>Logout</p>
            </div>
          )}
        </div>

         <div className='bg-gradient-to-r from-pink-500 to-[#FF8C42]  rounded-full flex items-center gap-2 py-3 px-4 mt-2'>
            <img src={assets.search_icon} alt="search" className='w-3' />
            <input onChange={(e)=>{setInput(e.target.value)}} type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder-white flex-1 placeholder:text-[15px]' placeholder='Search user'/>
         </div>

      </div>

      <div className='flex flex-col'>
           {filteredUsers.map((user,index)=>(
            <div onClick={()=>{setSelectedUser(user); setUnseenMessages(prev=>({...prev,[user._id]:0}));}} key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id===user._id && 'bg-pink-400'}`}>
                <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-[1/1] rounded-full'/>
                <div className='flex flex-col leading-5'>
                   <p>{user.fullName}</p>
                   {
                    onlineUsers.includes(user._id)
                    ? <span className='text-green-400 text-xs'>Online</span>
                    : <span className='text-neutral-400 text-xs'>Offline</span>
                   }
                </div>
                {unseenMessages[user._id]>0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user._id]}</p>}
            </div>
           ))}
      </div>

    </div>
  )
}

export default Sidebar
