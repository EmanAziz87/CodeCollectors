import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeReplies } from '../reducers/replyCommentReducer';

const Replies = ({ parentComment }) => {
  const dispatch = useDispatch();
  const replyComments = useSelector(({ replyComments }) => replyComments);

  useEffect(() => {
    dispatch(initializeReplies());
  }, [replyComments.length]);

  const firstReplies = replyComments.filter(
    (reply) => reply.parentCommentId === parentComment.id
  );

  return (
    <div>
      {firstReplies.map((reply) => (
        <div key={reply.id}>
          <div>
            <strong>{reply.author}</strong>
          </div>
          <div>{reply.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Replies;
