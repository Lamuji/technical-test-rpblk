import React from 'react'
import { Link } from 'react-router-dom'
import  './aside.css'
import { Avatar, AvatarImage, AvatarFallback} from '../@/components/ui/avatar'
import { Button } from '../@/components/ui/button'
import { useNavigate } from 'react-router-dom';


export default function Aside() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/Login');
  return (
    <aside className="sidebar">
      <div className="profile">
        <Avatar>
          <AvatarImage className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full '/>
          <AvatarFallback className='text-[#7B61FF] font-bold'>RF</AvatarFallback>
        </Avatar>
        <div className="profile-info">
          <h2 className='font-bold'>Ramzi Fkaier</h2>
          <p className='font-bold text-[#7B61FF]'>@r_fkaier</p>
        </div>
      </div>
      <nav className="navigation">
        <Button className='bg-[rgba(123,97,255,0.05)] hover:bg-[rgba(123,97,255,0.10)] font-bold text-[#7B61FF]'>Home</Button>
        <Button className='bg-[rgba(123,97,255,0.9)] hover:bg-[rgba(123,97,255,1)] font-bold'>Create a new post</Button>
        <Button onClick={handleClick}>Sign out</Button>
      </nav>
    </aside>
  )
}


