import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../context/ChatContext'

const HomePage = () => {

const {selectedUser} = useContext(ChatContext);

  return (
    <div className='max-w-[1400px]  h-screen sm:px-[15%] sm:py-[5%] flex justify-center items-center'>
       <div className={`backdrop-blur-xl border-2 border-pink-600 rounded-2xl overflow-hidden w-5/6 h-[100%]  sm:w-9/10 grid grid-cols-1 relative ${selectedUser? 'md:grid-cols-[2fr_2fr_1.5fr]':'md:grid-cols-2'}`}>
        <Sidebar />
        <ChatContainer/>
        <RightSidebar />
       </div>
    </div>
  )
}

export default HomePage
