import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inintializeSnippets } from '../reducers/snippetsReducer';
import Prism from 'prismjs';
import '../css/snippets.css';
import Snippet from './Snippet';

const Snippets = ({ post, postsFromHub }) => {
  const dispatch = useDispatch();
  const snippets = useSelector(({ snippets }) => snippets);

  useEffect(() => {
    dispatch(inintializeSnippets());
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
                <Snippet snip={snip} />
              </div>
            ))}
        </div>
      )}
      {!postsFromHub && (
        <div>
          {snippets.map((snip) => (
            <div key={snip.id}>
              <Snippet snip={snip} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Snippets;
