import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../reducers/postsReducer';
import postService from '../services/posts';
import CodeEditor from './CodeEditor';
import '../css/postForm.css';

const PostForm = ({ hub, postFormRef }) => {
  const [language, setLanguage] = useState('Java');
  const [title, setTitle] = useState('');
  const [snippetTitle, setSnippetTitle] = useState('');
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleAddPost = (event) => {
    event.preventDefault();
    postFormRef.current.handleReveal();
    postService.setToken(loggedUser);
    dispatch(
      createPost(
        { title, content },
        { title: snippetTitle, content: code, language },
        hub
      )
    );
    setTitle('');
    setSnippetTitle('');
    setContent('');
    setCode('');
  };

  return (
    <div className='post-form-parent-container'>
      <form onSubmit={handleAddPost}>
        <div className='post-form-title-container'>
          <label htmlFor='post-form-title' className='post-form-title'>
            Post Title{' '}
          </label>
          <input
            type='text'
            id='post-form-title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className='post-form-snippet-title-container'>
          <label
            htmlFor='post-form-snippet-title'
            className='post-form-snippet-title'
          >
            Snippet Title (Profile Only){' '}
          </label>
          <input
            type='text'
            id='post-form-snippet-title'
            value={snippetTitle}
            onChange={(event) => setSnippetTitle(event.target.value)}
          />
        </div>
        <CodeEditor
          setCode={setCode}
          code={code}
          language={language}
          setLanguage={setLanguage}
        />
        <div className='post-form-description-container'>
          <textarea
            id='post-form-description'
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder='//Explain Your Code'
          />
        </div>
        <button className='submit-post-button' type='submit'>
          Add
        </button>
      </form>
    </div>
  );
};

export default PostForm;
