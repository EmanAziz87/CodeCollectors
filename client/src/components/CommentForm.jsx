import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../reducers/parentCommentReducer';
import parentCommentService from '../services/parentComments';

const CommentForm = ({ post }) => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleCreateComment = (event) => {
    event.preventDefault();
    parentCommentService.setToken(loggedUser);
    dispatch(createComment(post.id, { content }));
    setContent('');
  };

  return (
    <div>
      <form onSubmit={handleCreateComment}>
        <div>
          <label htmlFor='comment-content'>Comment:</label>
        </div>
        <textarea
          id='comment-content'
          value={content}
          onChange={(event) => setContent(event.target.value)}
          cols='30'
          rows='10'
        ></textarea>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default CommentForm;
