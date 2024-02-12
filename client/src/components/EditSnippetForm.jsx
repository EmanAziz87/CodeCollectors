import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CodeEditor from './CodeEditor';
import snippetService from '../services/snippets';
import { useLocation, useNavigate } from 'react-router-dom';
import { editSnippet } from '../reducers/snippetsReducer';

const EditSnippetForm = () => {
  const { state } = useLocation();
  const [title, setTitle] = useState(state.snip.title);
  const [code, setCode] = useState(state.snip.content);

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);
  const navigate = useNavigate();

  const handleEditSnippet = (event) => {
    event.preventDefault();
    snippetService.setToken(loggedUser);
    dispatch(editSnippet(state.snip.id, { title, content: code }));
    setTitle('');
    setCode('');
    // const newEditedSnippet = {
    //   title,
    //   content: code,
    //   userId: loggedUser.id,
    // };
    navigate(`/profile/${loggedUser.username}`);
  };

  return (
    <div>
      <h2>Edit Create Your Snippet</h2>
      <form onSubmit={handleEditSnippet}>
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
          <CodeEditor setCode={setCode} code={code} />
        </div>
        <button type='submit'>Confirm Edit</button>
      </form>
      <button onClick={() => navigate(`/profile/${loggedUser.username}`)}>
        Cancel
      </button>
    </div>
  );
};

export default EditSnippetForm;
