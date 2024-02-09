import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeComments } from '../reducers/parentCommentReducer';
import Comment from './Comment';

const Comments = ({ post }) => {
  const dispatch = useDispatch();
  const comments = useSelector(({ parentComments }) => parentComments);

  useEffect(() => {
    dispatch(initializeComments(post.id));
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default Comments;
