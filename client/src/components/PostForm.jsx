import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../reducers/postsReducer';
import postService from '../services/posts';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleAddPost = (event) => {
    event.preventDefault();
    postService.setToken(loggedUser);
    dispatch(createPost({ title, content }));
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <form onSubmit={handleAddPost}>
        <div>
          <label htmlFor='post-form-title'>Title: </label>
          <input
            type='text'
            id='post-form-title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='post-form-content'>Content: </label>
          <input
            type='text'
            id='post-form-content'
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default PostForm;
