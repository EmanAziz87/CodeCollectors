import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import snippetService from '../services/snippets';
import { createSnippet } from '../reducers/snippetsReducer';
import { useNavigate } from 'react-router-dom';
import '../css/snippetForm.css';

const SnippetForm = () => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Java');

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);
  const navigate = useNavigate();

  const handleAddSnippet = (event) => {
    event.preventDefault();

    snippetService.setToken(loggedUser);
    dispatch(createSnippet({ title, content: code, language }));
    setTitle('');
    setCode('');
    setLanguage('');
    navigate(`/profile/${loggedUser.username}`);
  };

  return (
    <div className='snippet-form-parent-container'>
      <h2>Create Your Snippet</h2>
      <form onSubmit={handleAddSnippet}>
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
          Save
        </button>
        <Link to={`/profile/${loggedUser.username}`}>
          <button className='cancel-snippet-form-button'>Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default SnippetForm;
