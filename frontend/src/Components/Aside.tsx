import { useEffect, useState } from 'react'
import  './aside.css'
import { Avatar, AvatarImage, AvatarFallback} from '../@/components/ui/avatar'
import { Button } from '../@/components/ui/button'
import { useNavigate } from 'react-router-dom';
import {useJwt} from 'react-jwt'
import Modal from './Modal';

interface UserData {
  lastname: string;
  firstname: string;
  username: string;
}

function getInitials(username: string | undefined, lastname: string | undefined): string {

  const initials = `${username?.charAt(0).toUpperCase()}${lastname?.charAt(0).toUpperCase()}`;
  return initials;
}

export default function Aside() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>();
  const token = localStorage.getItem('token') as string
  const initials = getInitials(userData?.lastname, userData?.firstname)
  const navigate = useNavigate();
  const { decodedToken , isExpired } = useJwt(token) as { decodedToken: { email : string }; isExpired: boolean };

  useEffect(() => {
    
    const fetchUserData = async () => {
      if (decodedToken && decodedToken.email && !isExpired) {
        try {
          const response = await fetch(`http://localhost:3001/users/getUser?email=${decodedToken.email}`);
          if (response.status == 200) {
            const data = await response.json();
            setUserData(data.result); 
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [decodedToken, isExpired]);

    const handleClick = () => {
    localStorage.removeItem('token')
    navigate('/Login');
  }

  const handleCreatePostClick = () => {
    setModalOpen(true);
  };

  const sendPost = async (postContent: string) => {
    try {
      const response = await fetch('http://localhost:3001/users/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData?.username,
          firstname: userData?.firstname,
          lastname: userData?.lastname, 
          message: postContent,
          like: 0,
          dislike: 0
        }),
      });
  
      if (!response.ok)
        throw new Error('Network response was not ok');

      setModalOpen(false);

    } catch (error) {
      console.error('Failed to send post:', error);
    }
  }

  return (
    <aside className="sidebar">
      <div className="profile">
        <Avatar>
          <AvatarImage className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full '/>
          <AvatarFallback className='text-[#7B61FF] font-bold'>{initials}</AvatarFallback>
        </Avatar>
        <div className="profile-info">
          <h2 className='font-bold'>{userData?.lastname ?? 'Lastname'} {userData?.firstname ?? 'Firstname'}</h2>
          <p className='font-bold text-[#7B61FF]'>@{userData?.username ?? 'Username'}</p>
        </div>
      </div>
      <nav className="navigation">
        <Button className='bg-[rgba(123,97,255,0.05)] hover:bg-[rgba(123,97,255,0.10)] font-bold text-[#7B61FF]'>Home</Button>
        <Button className='bg-[rgba(123,97,255,0.9)] hover:bg-[rgba(123,97,255,1)] font-bold'
          onClick={handleCreatePostClick}
        >Create a new post</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onPostSubmit={sendPost}
      />
        <Button onClick={handleClick}>Sign out</Button>
      </nav>
    </aside>
  )
}


