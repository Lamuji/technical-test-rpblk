import React, {useState, useEffect} from 'react'
import './tweets.css'
import { Avatar, AvatarFallback, AvatarImage } from '../@/components/ui/avatar'
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

interface Posts {
  lastname: string;
  firstname: string;
  username: string;
  message: string;
  like: number;
  dislike: number;
}

export default function Tweets() {
  const [posts, setPost] = useState<Posts[]>([]);

  useEffect(() => {
    socket.on('post', (post: Posts) => {
      setPost((prevPost: Posts[]) => [...prevPost, post]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className='tweets-container'>
      {posts && posts.map((post: Posts, index: number) => (
        <div className="tweet" key={index}>
          <div className="profile">
            <Avatar>
              <AvatarImage className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full' />
              <AvatarFallback className='text-[#7B61FF] font-bold'>{`${post.lastname.charAt(0).toUpperCase()}${post.firstname.charAt(0).toUpperCase()}`}</AvatarFallback>
            </Avatar>
            <div className="profile-info">
              <h2 className='font-bold'>{`${post.lastname} ${post.firstname}`}</h2>
              <p className='font-bold text-[#7B61FF]'>@{post.username}</p>
            </div>
          </div>
          <div className="tweet-body">
            {post.message}
          </div>
          <div className="tweet-actions">
            <div className="tweet-action likes">
              {post.like}
            </div>
            <div className="tweet-action dislikes">
              {post.dislike}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


