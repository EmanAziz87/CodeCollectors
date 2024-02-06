import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializePosts } from '../reducers/postsReducer';
import PostForm from './PostForm';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(({ posts }) => posts);

  useEffect(() => {
    dispatch(initializePosts());
  }, []);

  return (
    <div>
      <h2>Add Post</h2>
      <PostForm />
      <h2>Posts</h2>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <div>Title: {post.title}</div>
            <div> Author: {post.author}</div>
            <div>{post.content}</div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
