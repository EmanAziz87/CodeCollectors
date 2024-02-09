import Replies from './Replies';
import ReplyForm from './ReplyForm';
import Toggle from './Toggle';

const Comment = ({ comment }) => {
  return (
    <div>
      <div>
        <strong>{comment.author}</strong>
      </div>
      <div>{comment.content}</div>
      <Toggle buttonLabel='Reply'>
        <ReplyForm parentComment={comment} />
      </Toggle>
      <Replies parentComment={comment} />
    </div>
  );
};

export default Comment;
