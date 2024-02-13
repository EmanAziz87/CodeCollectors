import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from '../reducers/postsReducer';
import postService from '../services/posts';
import CodeEditor from './CodeEditor';
import { useLocation, useNavigate } from 'react-router-dom';

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
    navigate(`/posts/${state.post.id}`, {
      state: {
        post: { ...newEditedPost, author: loggedUser.username },
        hub: state.hub,
      },
    });
  };

  return (
    <div>
      <button
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
        Go Back
      </button>
      <form onSubmit={handleEditPost}>
        <div>
          <div>
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
          <div>
            <label htmlFor='post-form-content'>Content: </label>
          </div>
          <textarea
            id='post-form-description'
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={5}
            cols={40}
          />
        </div>
        <div>
          <label htmlFor='post-form-snippet-title'>Snippet Title: </label>
        </div>
        <input
          type='text'
          id='post-form-snippet-title'
          value={snippetTitle}
          onChange={(event) => setSnippetTitle(event.target.value)}
        />
        <CodeEditor
          setCode={setCode}
          code={code}
          language={language}
          setLanguage={setLanguage}
        />
        <button type='submit'>Confirm Edit</button>
      </form>
    </div>
  );
};

export default EditPostForm;
