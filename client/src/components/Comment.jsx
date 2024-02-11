import '../css/comment.css';
import CommentForm from './CommentForm';

const Comment = ({ comment, post }) => {
  return (
    <div>
      <h3>{comment.author}</h3>
      <div>{comment.content}</div>

      <CommentForm post={post} parentId={comment.id} />
    </div>
  );
};

export default Comment;
