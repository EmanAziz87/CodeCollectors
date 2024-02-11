import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../reducers/commentReducer';
import commentService from '../services/comments';

const CommentForm = ({ post, parentId }) => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleCreateComment = (event) => {
    event.preventDefault();
    commentService.setToken(loggedUser);
    console.log('POSTID IN COMMENT FORM', post);
    dispatch(createComment(post.id, { content, parentId }));
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
