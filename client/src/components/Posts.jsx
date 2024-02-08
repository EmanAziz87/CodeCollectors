import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializePosts } from '../reducers/postsReducer';
import Snippets from './Snippets';
import '../css/posts.css';

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
              <div>Title: {post.title}</div>
              <div> Author: {post.author}</div>
              <div>{post.content}</div>
              <Snippets post={post} postsFromHub={true} />
              <br />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
