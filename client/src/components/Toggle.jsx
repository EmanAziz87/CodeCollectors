import { useState } from 'react';

const Toggle = (props) => {
  const [reveal, setReveal] = useState(false);

  const handleReveal = () => {
    setReveal(!reveal);
  };

  const show = reveal ? { display: '' } : { display: 'none' };
  const hide = reveal ? { display: 'none' } : { display: '' };

  return (
    <div>
      <div style={hide} className='hidden-details'>
        <button onClick={handleReveal}>{props.buttonLabel}</button>
      </div>
      <div style={show} className='show-details'>
        <div>{props.children}</div>
        <button onClick={handleReveal}>Cancel</button>
      </div>
    </div>
  );
};

export default Toggle;
