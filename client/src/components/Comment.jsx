import '../css/comment.css';
import CommentForm from './CommentForm';
import Toggle from './Toggle';

const Comment = ({ comment, post }) => {
  return (
    <div>
      <h3>{comment.author}</h3>
      <div>{comment.content}</div>
      <Toggle buttonLabel='Reply'>
        <CommentForm post={post} parentId={comment.id} />
      </Toggle>
    </div>
  );
};

export default Comment;
