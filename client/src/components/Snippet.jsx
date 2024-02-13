import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import snippetService from '../services/snippets';
import '../css/snippet.css';
import { deleteSnippet, initializeSnippets } from '../reducers/snippetsReducer';
import { Link } from 'react-router-dom';

const Snippet = ({ snip, postsFromHub, language, setLanguage }) => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeSnippets());
  }, []);

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
        <div>{snip.language}</div>
        <pre style={expandedCode}>
          <code className={`language-${snip.language}`}>{snip.content}</code>
        </pre>
        <button onClick={expandAndShrink}>Expand</button>
        {!postsFromHub && (
          <div>
            <button onClick={handleDeleteSnippet}>Delete</button>
            <Link to='/snippetEditForm' state={{ snip }}>
              Edit Snippet
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Snippet;
