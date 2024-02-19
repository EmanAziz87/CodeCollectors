import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import snippetService from '../services/snippets';
import { deleteSnippet, initializeSnippets } from '../reducers/snippetsReducer';
import { Link } from 'react-router-dom';
import '../css/snippet.css';

const Snippet = ({ snip, postsFromHub }) => {
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
    <div className='snippet-parent-container'>
      <h4>{!postsFromHub && snip.title}</h4>
      <div className='snippet-container'>
        {postsFromHub ? (
          <pre className='line-numbers'>
            <code className={`language-${snip.language}`}>{snip.content}</code>
          </pre>
        ) : (
          <div className='snippet-profile-container'>
            <pre className='line-numbers' style={expandedCode}>
              <code className={`language-${snip.language}`}>
                {snip.content}
              </code>
            </pre>
          </div>
        )}
        <div className='snippet-buttons-container'>
          {!postsFromHub && (
            <div className='snippet-edit-delete-buttons'>
              <button onClick={handleDeleteSnippet}>Delete</button>
              <Link to='/snippetEditForm' state={{ snip }}>
                <button className='edit-snippet-button'>Edit</button>
              </Link>
              <button onClick={expandAndShrink}>Expand</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Snippet;
