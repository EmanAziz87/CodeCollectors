import CommentForm from './CommentForm';
import Comments from './Comments';
import Snippets from './Snippets';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeSnippets } from '../reducers/snippetsReducer';
import { initializePostLikes, likePost } from '../reducers/postLikesReducer';
import likeService from '../services/likes';
import { useEffect } from 'react';
import '../css/post.css';

const Post = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const snippets = useSelector(({ snippets }) => snippets);
  const loggedUser = useSelector(({ user }) => user);
  const postLikes = useSelector(({ postLikes }) => postLikes);

  useEffect(() => {
    dispatch(initializeSnippets());
    dispatch(initializePostLikes());
  }, [postLikes.length]);

  const handleLikePost = (postId) => {
    likeService.setToken(loggedUser);
    dispatch(likePost(postId));
  };

  const matchingSnippet = snippets.find(
    (snippet) => snippet.id === state.post.snippetId
  );

  return (
    <div className='post-parent-container'>
      <button
        className='back-button'
        onClick={() => navigate(state.prevPath, { state: { hub: state.hub } })}
      >
        Go Back
      </button>

      <div className='post-sub-container'>
        <div className='post-top-content-container'>
          <h2 className='post-title'>{state.post.title}</h2>
          <div>{state.post.author}</div>
          <div className='likes-count-container'>
            <span className='likes-count'>
              {
                postLikes.filter((likes) => likes.postId === state.post.id)
                  .length
              }
              &#11014;
            </span>
          </div>
        </div>
        <Snippets post={state.post} postsFromHub={true} />

        <div className='post-buttons-container'>
          <div className='post-content'>{state.post.content}</div>
          <div className='post-edit-like-buttons-container'>
            {loggedUser?.username === state.post.author && matchingSnippet && (
              <Link
                to='/editPostForm'
                state={{
                  post: state.post,
                  snippet: matchingSnippet,
                  hub: state.hub,
                  prevPath: `/posts/${state.post.id}`,
                  prevPrevPath: state.prevPath,
                  prevState: state,
                }}
              >
                <button className='edit-post-form-button'> Edit</button>
              </Link>
            )}
            {loggedUser &&
              !postLikes.find(
                (likes) =>
                  likes.postId === state.post.id &&
                  likes.userId === loggedUser.id
              ) && (
                <button
                  className='like-post-button-postpage'
                  onClick={() => handleLikePost(state.post.id)}
                >
                  Like
                </button>
              )}{' '}
          </div>
        </div>
      </div>
      <div className='comment-container'>
        <div className='comment-form-container'>
          <CommentForm
            post={state.post}
            parentId={null}
            resetForms={() => () => console.log('great')}
          />
        </div>
        <div className='allpost-comments-container'>
          <Comments post={state.post} />
        </div>
      </div>
    </div>
  );
};

export default Post;
