import { forwardRef, useState, useImperativeHandle } from 'react';

const Toggle = forwardRef((props, ref) => {
  const [reveal, setReveal] = useState(false);

  const handleReveal = () => {
    setReveal(!reveal);
  };

  const show = reveal ? { display: '' } : { display: 'none' };
  const hide = reveal ? { display: 'none' } : { display: '' };

  useImperativeHandle(ref, () => {
    return {
      handleReveal,
    };
  });

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
});

export default Toggle;
