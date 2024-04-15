import {useState, useEffect} from 'react';
import './tweets.css';
import io from "socket.io-client";
import { Avatar, AvatarFallback, AvatarImage } from '../@/components/ui/avatar';
import { socket } from '../socket';
import { Button } from '../@/components/ui/button';

interface Posts {
  id: number;
  lastname: string;
  firstname: string;
  username: string;
  message: string;
  like: number;
  dislike: number;
}

export default function Tweets() {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {

  socket.emit('getPosts');

  socket.on('getPosts', (posts: Posts[]) => {
    console.log("Received all posts: ", posts);
    setPosts([...posts].reverse());
  });

  socket.on('postUpdated', (updatedPost: Posts) => {

    setPosts(prevPosts => {
      const index = prevPosts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {

        const newPosts = [...prevPosts];
        newPosts[index] = {...prevPosts[index], ...updatedPost};
        return newPosts;
      }
      return prevPosts;
    });
  });


  socket.on("error", (error) => {
    console.error("Socket error: ", error);
  });

  }, []);

  const handleInteraction = (post: Posts, type: 'like' | 'dislike') => {
    const increment = type === 'like' ? !post.like : !post.dislike;
    socket.emit(type, { postId: post.id, increment });
};

return (
  <div className='tweets-container'>
    {posts && posts.map((post : Posts) => (
      <div className="tweet" key={post.id}>
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
          <div className="tweet-action likes" onClick={() => handleInteraction(post, 'like')}>
            {post.like}
          </div>
          <div className="tweet-action dislikes" onClick={() => handleInteraction(post, 'dislike')}>
            {post.dislike}
          </div>
        </div>
      </div>
    ))}
  </div>
);
}