import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CodeEditor from './CodeEditor';
import snippetService from '../services/snippets';
import { useLocation, useNavigate } from 'react-router-dom';
import { editSnippet } from '../reducers/snippetsReducer';
import '../css/editSnippetForm.css';
import '../css/snippetForm.css';

const EditSnippetForm = () => {
  const { state } = useLocation();
  const [language, setLanguage] = useState('Java');
  const [title, setTitle] = useState(state.snip.title);
  const [code, setCode] = useState(state.snip.content);

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);
  const navigate = useNavigate();

  const handleEditSnippet = (event) => {
    event.preventDefault();
    snippetService.setToken(loggedUser);
    dispatch(
      editSnippet(state.snip.id, {
        title,
        content: code,
        language,
      })
    );
    setTitle('');
    setCode('');
    navigate(`/profile/${loggedUser.username}`);
  };

  return (
    <div className='snippet-form-parent-container'>
      <h2>Edit Snippet</h2>
      <form onSubmit={handleEditSnippet}>
        <div className='snippet-form-title-container'>
          <div>
            <label htmlFor='snippet-title-form'>Snippet Title</label>
          </div>
          <input
            type='text'
            id='snippet-title-form'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <CodeEditor
            setCode={setCode}
            code={code}
            language={language}
            setLanguage={setLanguage}
          />
        </div>
        <button className='save-snippet-button' type='submit'>
          Confirm
        </button>
        <button
          className='cancel-snippet-form-button'
          onClick={() => navigate(`/profile/${loggedUser.username}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditSnippetForm;
