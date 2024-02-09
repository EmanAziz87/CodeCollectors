import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import replyCommentService from '../services/replyComments';
import { createReply } from '../reducers/replyCommentReducer';

const ReplyForm = ({ parentComment }) => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleCreateReply = (event) => {
    event.preventDefault();
    replyCommentService.setToken(loggedUser);
    dispatch(createReply(parentComment.id, { content }));
    setContent('');
  };
  return (
    <div>
      <form onSubmit={handleCreateReply}>
        <div>
          <label htmlFor='reply-content'>Reply:</label>
        </div>
        <textarea
          id='reply-content'
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

export default ReplyForm;
