import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import snippetService from '../services/snippets';
import '../css/snippet.css';
import { deleteSnippet } from '../reducers/snippetsReducer';

const Snippet = ({ snip, postsFromHub }) => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const expandAndShrink = () => {
    setExpanded(!expanded);
  };

  const handleDeleteSnippet = () => {
    snippetService.setToken(loggedUser);
    dispatch(deleteSnippet(snip.id));
  };

  const expandedCode = expanded ? { maxHeight: '' } : { maxHeight: '100px' };

  return (
    <div>
      <h4>{snip.title}</h4>
      <div className='snippet-container'>
        <pre style={expandedCode}>
          <code className='language-js'>{snip.content}</code>
        </pre>
        <button onClick={expandAndShrink}>Expand</button>
        {!postsFromHub && <button onClick={handleDeleteSnippet}>Delete</button>}
      </div>
    </div>
  );
};

export default Snippet;
