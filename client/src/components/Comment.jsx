import { useDispatch, useSelector } from 'react-redux';
import '../css/comment.css';
import CommentForm from './CommentForm';
import { deleteComment } from '../reducers/commentReducer';
import commentService from '../services/comments';
import EditCommentForm from './EditCommentForm';
import { useState } from 'react';

const Comment = ({ comment, post }) => {
  const [content, setContent] = useState(comment.content);
  const [showEdit, setShowEdit] = useState(false);
  const [showComment, setShowComment] = useState(true);
  const [showReply, setShowReply] = useState(false);
  const [editButton, setEditButton] = useState(true);
  const [deleteButton, setDeleteButton] = useState(true);
  const [replyButton, setReplyButton] = useState(true);

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleDeleteComment = () => {
    commentService.setToken(loggedUser);
    dispatch(deleteComment(comment.id));
  };

  const handleShowEdit = (buttonText) => {
    if (buttonText === 'Cancel') {
      setContent(comment.content);
    }
    setShowEdit(!showEdit);
    setShowComment(!showComment);
    setShowReply(false);
    setDeleteButton(!deleteButton);
    setReplyButton(!replyButton);
  };

  const handleShowComment = () => {
    setShowComment(true);
    setShowEdit(false);
    setShowReply(false);
    setEditButton(true);
    setReplyButton(true);
    setDeleteButton(true);
  };

  const handleShowReply = () => {
    setShowReply(!showReply);
    setShowComment(true);
    setShowEdit(false);
    setEditButton(!editButton);
    setDeleteButton(!deleteButton);
  };

  const toggleEdit = showEdit ? { display: '' } : { display: 'none' };
  const toggleComment = showComment ? { display: '' } : { display: 'none' };
  const toggleReply = showReply ? { display: '' } : { display: 'none' };
  const toggleEditButton = editButton ? { display: '' } : { display: 'none' };
  const toggleDeleteButton = deleteButton
    ? { display: '' }
    : { display: 'none' };
  const toggleReplyButton = replyButton ? { display: '' } : { display: 'none' };

  return (
    <div className='comment-parent-container'>
      <div style={toggleComment}>
        <h3>{comment.author}</h3>
        <div className='comment-content'>{content}</div>
      </div>
      {loggedUser && (
        <div style={toggleReply}>
          <CommentForm
            post={post}
            parentId={comment.id}
            resetForms={handleShowComment}
          />
        </div>
      )}
      <div className='comment-buttons-container'>
        {loggedUser?.username === comment.author && (
          <div className='edit-delete-comment-container'>
            <div style={toggleEdit}>
              <EditCommentForm
                comment={comment}
                postId={post.id}
                setContent={setContent}
                content={content}
                oldContent={comment.content}
                resetForms={handleShowComment}
              />
            </div>
            <button
              className='edit-comment-button'
              style={toggleEditButton}
              onClick={(event) => handleShowEdit(event.target.innerText)}
            >
              {showEdit ? 'Cancel' : 'Edit'}
            </button>
            <button style={toggleDeleteButton} onClick={handleDeleteComment}>
              Delete
            </button>
          </div>
        )}

        {loggedUser && (
          <button style={toggleReplyButton} onClick={handleShowReply}>
            {showReply ? 'Cancel' : 'Reply'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
