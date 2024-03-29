import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from '../reducers/postsReducer';
import postService from '../services/posts';
import CodeEditor from './CodeEditor';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/postForm.css';
import '../css/editPostForm.css';

const EditPostForm = () => {
  const { state } = useLocation();
  const [language, setLanguage] = useState('Java');
  const [title, setTitle] = useState(state.post.title);
  const [snippetTitle, setSnippetTitle] = useState(state.snippet.title);
  const [content, setContent] = useState(state.post.content);
  const [code, setCode] = useState(state.snippet.content);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleEditPost = (event) => {
    event.preventDefault();
    // postFormRef.current.handleReveal();
    postService.setToken(loggedUser);
    dispatch(
      editPost(
        { title, content },
        { title: snippetTitle, content: code, language },
        state.post.id,
        state.post.snippetId,
        state.hub.id
      )
    );
    const newEditedPost = {
      id: state.post.id,
      title,
      content,
      snippetId: state.post.snippetId,
      hubId: state.hub.id,
    };
    setTitle('');
    setSnippetTitle('');
    setContent('');
    setCode('');
    navigate(state.prevPath, {
      state: {
        post: { ...newEditedPost, author: state.post.author },
        snippet: state.snippet,
        hub: state.hub,
        prevPath: state.prevPrevPath,
      },
    });
  };

  return (
    <div className='edit-post-form-parent-container'>
      <div className='post-form-parent-container'>
        <form onSubmit={handleEditPost}>
          <div className='post-form-title-container'>
            <div>
              <label htmlFor='post-form-title'>Post Title: </label>
            </div>
            <input
              type='text'
              id='post-form-title'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className='post-form-snippet-title-container'>
            <div>
              <label htmlFor='post-form-snippet-title'>Snippet Title: </label>
            </div>
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
              rows={5}
              cols={40}
            />
          </div>
          <button
            className='submit-post-button submit-edit-button'
            type='submit'
          >
            Confirm Edit
          </button>
        </form>
      </div>
      <button
        className='back-button edit-form-back-button'
        onClick={() =>
          navigate(state.prevPath, {
            state: {
              post: state.post,
              snippet: state.snippet,
              hub: state.hub,
              prevPath: state.prevPrevPath,
            },
          })
        }
      >
        Cancel
      </button>
    </div>
  );
};

export default EditPostForm;
