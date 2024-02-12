import { useDispatch, useSelector } from 'react-redux';
import '../css/comment.css';
import CommentForm from './CommentForm';
import Toggle from './Toggle';
import { deleteComment } from '../reducers/commentReducer';
import commentService from '../services/comments';
import EditCommentForm from './EditCommentForm';

const Comment = ({ comment, post }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleDeleteComment = () => {
    commentService.setToken(loggedUser);
    dispatch(deleteComment(comment.id));
  };

  return (
    <div>
      <h3>{comment.author}</h3>
      <div>{comment.content}</div>
      <Toggle buttonLabel='Reply'>
        <CommentForm post={post} parentId={comment.id} />
      </Toggle>
      {loggedUser?.username === comment.author && (
        <div>
          <button onClick={handleDeleteComment}>Delete</button>
          <Toggle buttonLabel='Edit'>
            <EditCommentForm comment={comment} postId={post.id} />
          </Toggle>
        </div>
      )}
    </div>
  );
};

export default Comment;
