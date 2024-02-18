import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../reducers/commentReducer';
import commentService from '../services/comments';
import '../css/commentForm.css';

const CommentForm = ({ post, parentId, resetForms }) => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleCreateComment = (event) => {
    event.preventDefault();
    commentService.setToken(loggedUser);
    console.log('POSTID IN COMMENT FORM', post);
    dispatch(createComment(post.id, { content, parentId }));
    setContent('');
    resetForms();
  };

  return (
    <div>
      <form className='comment-form-container' onSubmit={handleCreateComment}>
        <div className='comment-label-container'>
          <label htmlFor='comment-content'>Add a Comment</label>
        </div>
        <textarea
          id='comment-content'
          value={content}
          onChange={(event) => setContent(event.target.value)}
          autosize
        ></textarea>
        <div>
          <button class='add-comment-button' type='submit'>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
