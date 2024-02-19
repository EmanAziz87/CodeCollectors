import Comment from './Comment';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  likeComment,
  initializeCommentLikes,
} from '../reducers/commentLikesReducer';
import likeService from '../services/likes';
import '../css/topComment.css';

const TopComment = ({ topLevelComment, post }) => {
  const commentLikes = useSelector(({ commentLikes }) => commentLikes);
  const loggedUser = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCommentLikes());
  }, [commentLikes.length]);

  const handleLikeComment = (commentId) => {
    likeService.setToken(loggedUser);
    dispatch(likeComment(commentId));
  };

  return (
    <div
      style={{
        marginBottom: '12px',
        paddingLeft: 10,
        borderLeft: '1px solid grey',
      }}
    >
      <Comment comment={topLevelComment} post={post} />
      <div className='comment-likes-container'>
        <span className='likes-count comment-likes-count'>
          {
            commentLikes.filter(
              (likes) => likes.commentId === topLevelComment.id
            ).length
          }
          &#11014;
        </span>
        {loggedUser &&
          !commentLikes.find(
            (likes) =>
              likes.commentId === topLevelComment.id &&
              likes.userId === loggedUser.id
          ) && (
            <button
              className='comment-like-button'
              onClick={() => handleLikeComment(topLevelComment.id)}
            >
              Like
            </button>
          )}
      </div>
      {topLevelComment.childrenComments.map((child) => {
        return (
          <div key={child.id} style={{ paddingLeft: 10 }}>
            <TopComment topLevelComment={child} post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default TopComment;
