import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeSnippets } from '../reducers/snippetsReducer';
import Prism from 'prismjs';
import '../css/snippets.css';
import Snippet from './Snippet';

const Snippets = ({ post, postsFromHub }) => {
  const dispatch = useDispatch();
  const snippets = useSelector(({ snippets }) => snippets);
  const loggedUser = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeSnippets());
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippets]);

  return (
    <div>
      {postsFromHub && (
        <div>
          {snippets
            .filter((snip) => snip.id === post.snippetId)
            .map((snip) => (
              <div key={snip.id}>
                <Snippet snip={snip} postsFromHub={postsFromHub} />
              </div>
            ))}
        </div>
      )}
      {!postsFromHub && (
        <div>
          {snippets
            .filter((snip) => snip.userId === loggedUser.id)
            .map((snip) => (
              <div key={snip.id}>
                <Snippet snip={snip} postsFromHub={postsFromHub} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Snippets;
