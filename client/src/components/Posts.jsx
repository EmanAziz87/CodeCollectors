import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializePosts } from '../reducers/postsReducer';
import '../css/posts.css';
import Post from './Post';

const Posts = ({ hub }) => {
  const dispatch = useDispatch();
  const posts = useSelector(({ posts }) => posts);

  useEffect(() => {
    dispatch(initializePosts());
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <div>
        {posts
          .filter((post) => post.hubId === hub.id)
          .map((post) => (
            <div key={post.id} className='post-container'>
              <Link to={`/posts/${post.id}`} state={{ post, hub }}>
                {post.title} by {post.author}
              </Link>
              <br />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
