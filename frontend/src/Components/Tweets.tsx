import {useState, useEffect} from 'react'
import './tweets.css'
import { Avatar, AvatarFallback, AvatarImage } from '../@/components/ui/avatar'

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
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const fetchPosts = () => {
    fetch('http://localhost:3001/users/getPosts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
          setPosts(data.reverse());
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };

  useEffect(() => {
    fetchPosts(); 
    const intervalId = setInterval(fetchPosts, 100);
    return () => clearInterval(intervalId);
  }, []);

  const handleLike = async (postId: number) => {
    try {
      if (likedPosts.includes(postId)) {
        console.log('Vous avez déjà aimé ce post.');
        return;
      }
      const response = await fetch('http://localhost:3001/users/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId }),
      });
      setLikedPosts([...likedPosts, postId]);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, like: post.like + 1 } : post
        )
      );
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleDislike = async (postId: number) => {
    try {
      const response = await fetch('http://localhost:3001/users/dislike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId }),
      });
    } catch (error) {
      console.error('Erreur:', error);
    }
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
            <div className="tweet-action likes" onClick={() => handleLike(post.id)}>
              {post.like}
            </div>
            <div className="tweet-action dislikes" onClick={() => handleDislike(post.id)}>
              {post.dislike}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
