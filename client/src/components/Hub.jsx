import { useLocation } from 'react-router-dom';
import PostForm from './PostForm';
import Posts from './Posts';
import Toggle from './Toggle';

const Hub = () => {
  const { state } = useLocation();

  return (
    <div>
      <h2>{state.hub.name}</h2>
      <h4>Subscribers: {state.hub.subscribers}</h4>
      <Toggle buttonLabel={'Make a Post'}>
        <PostForm hub={state.hub} />
      </Toggle>
      <Posts hub={state.hub} />
    </div>
  );
};

export default Hub;
