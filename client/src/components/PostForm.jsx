import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../reducers/postsReducer';
import postService from '../services/posts';
import CodeEditor from './CodeEditor';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleAddPost = (event) => {
    event.preventDefault();
    postService.setToken(loggedUser);
    dispatch(createPost({ title, code }));
    setTitle('');
    setCode('');
  };

  console.log('CONTENT STATE:', code);

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
        </div>
        <button type='submit'>Add</button>
      </form>
      {/* <div>
        <pre>
          <code className='language-javascript'>{content}</code>
        </pre>
      </div> */}
      <CodeEditor setCode={setCode} code={code} />
    </div>
  );
};

export default PostForm;
