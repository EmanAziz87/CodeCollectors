import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initializeComments } from '../reducers/commentReducer';
import TopComment from './TopComment';

const Comments = ({ post }) => {
  const dispatch = useDispatch();
  const comments = useSelector(({ comments }) => comments);

  if (!comments) {
    return null;
  }

  useEffect(() => {
    console.log('useEffect ran');
    dispatch(initializeComments(post.id));
  }, [comments.length]);

  return (
    <div style={{ paddingLeft: 10 }}>
      {comments.map((topLevelComment) => {
        return (
          <div key={topLevelComment.id} style={{ paddingLeft: 10 }}>
            <TopComment topLevelComment={topLevelComment} post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
