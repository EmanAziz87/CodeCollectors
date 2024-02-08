import { useState } from 'react';
import '../css/snippet.css';

const Snippet = ({ snip }) => {
  const [expanded, setExpanded] = useState(false);

  const expandAndShrink = () => {
    setExpanded(!expanded);
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
      </div>
    </div>
  );
};

export default Snippet;
