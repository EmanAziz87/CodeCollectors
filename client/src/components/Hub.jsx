import { useLocation } from 'react-router-dom';
import PostForm from './PostForm';
import Posts from './Posts';

const Hub = () => {
  const { state } = useLocation();

  return (
    <div>
      <h2>{state.hub.name}</h2>
      <h4>Subscribers: {state.hub.subscribers}</h4>
      <PostForm hub={state.hub} />
      <Posts hub={state.hub} />
    </div>
  );
};

export default Hub;
