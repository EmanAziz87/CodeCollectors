import Snippets from './Snippets';
import { useLocation, useNavigate } from 'react-router-dom';

const Post = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log('STATE: ', state);
  return (
    <div>
      <button
        onClick={() =>
          navigate(`/hubs/${state.hub.id}`, { state: { hub: state.hub } })
        }
      >
        Go Back
      </button>
      <div>Title: {state.post.title}</div>
      <div> Author: {state.post.author}</div>
      <div>{state.post.content}</div>
      <Snippets post={state.post} postsFromHub={true} />
    </div>
  );
};

export default Post;
