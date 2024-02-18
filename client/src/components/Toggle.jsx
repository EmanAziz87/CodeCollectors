import { forwardRef, useState, useImperativeHandle } from 'react';
import '../css/toggle.css';

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
    <div className='toggle-parent-container'>
      <div style={hide} className='hidden-details'>
        <button className='toggle-button' onClick={handleReveal}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={show} className='show-details'>
        <div>{props.children}</div>
        <div className='exit-toggle-button-container'>
          <button className='toggle-button' onClick={handleReveal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});

export default Toggle;
