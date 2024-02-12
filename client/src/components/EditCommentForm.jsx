import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentService from '../services/comments';
import { editComment } from '../reducers/commentReducer';

const EditCommentForm = ({ comment, postId }) => {
  const [content, setContent] = useState(comment.content);

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleEditComment = (event) => {
    event.preventDefault();
    commentService.setToken(loggedUser);
    dispatch(editComment(comment.id, { content }, postId));
    setContent('');
  };

  return (
    <div>
      <form onSubmit={handleEditComment}>
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

export default EditCommentForm;
