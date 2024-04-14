import {useState, useEffect} from 'react';
import './tweets.css';
import io from "socket.io-client";
import { Avatar, AvatarFallback, AvatarImage } from '../@/components/ui/avatar';

interface Posts {
  id: number;
  lastname: string;
  firstname: string;
  username: string;
  message: string;
  like: number;
  dislike: number;
}
const socket = io("http://localhost:3001", { autoConnect: true, reconnection: true });

export default function Tweets() {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    socket.on('allPosts', (posts: Posts[]) => {
      console.log("Received all posts: ", posts);
      setPosts(posts.reverse());
    });
    socket.on('newPost', (post: Posts) => {
      setPosts(prevPosts => [post, ...prevPosts]);
    });
    socket.on('postUpdated', (updatedPost: Posts) => {
      setPosts(prevPosts => prevPosts.map(post => 
        post.id === updatedPost.id ? {...post, ...updatedPost} : post
      ));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected, attempting to reconnect");
      socket.connect();
    });

    socket.on("error", (error) => {
      console.error("Socket error: ", error);
    });

    return () => {
      socket.off('allPosts');
      socket.off('newPost');
      socket.off('postUpdated');
      socket.off("disconnect");
      socket.off("error");
    };
  }, []);

  const handleInteraction = (postId: number, type: 'like' | 'dislike') => {
    socket.emit(type, { postId });
  };

  return (
    <div className='tweets-container'>
      {posts.map(post => (
        <div className="tweet" key={post.id}>
          <Avatar>
            <AvatarImage className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full' />
            <AvatarFallback className='text-[#7B61FF] font-bold'>{`${post.lastname.charAt(0).toUpperCase()}${post.firstname.charAt(0).toUpperCase()}`}</AvatarFallback>
          </Avatar>
          <div className="profile-info">
            <h2 className='font-bold'>{`${post.lastname} ${post.firstname}`}</h2>
            <p className='font-bold text-[#7B61FF]'>@{post.username}</p>
          </div>
          <div className="tweet-body">{post.message}</div>
          <div className="tweet-actions">
            <button className="tweet-action likes" onClick={() => handleInteraction(post.id, 'like')}>{post.like}</button>
            <button className="tweet-action dislikes" onClick={() => handleInteraction(post.id, 'dislike')}>{post.dislike}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
