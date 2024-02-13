import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CodeEditor from './CodeEditor';
import snippetService from '../services/snippets';
import { createSnippet } from '../reducers/snippetsReducer';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Create Your Snippet</h2>
      <form onSubmit={handleAddSnippet}>
        <div>
          <div>
            <label htmlFor='snippet-title-form'>Snippet Title:</label>
          </div>
          <input
            type='text'
            id='snippet-title-form'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <h3>Code Snippet:</h3>
          <CodeEditor
            setCode={setCode}
            code={code}
            language={language}
            setLanguage={setLanguage}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default SnippetForm;
