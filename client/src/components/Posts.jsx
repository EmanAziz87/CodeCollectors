import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializePosts, deletePost } from '../reducers/postsReducer';
import postService from '../services/posts';
import likeService from '../services/likes';
import '../css/posts.css';
import { initializePostLikes, likePost } from '../reducers/postLikesReducer';

const Posts = ({ hub }) => {
  const dispatch = useDispatch();
  const posts = useSelector(({ posts }) => posts);
  const loggedUser = useSelector(({ user }) => user);
  const postLikes = useSelector(({ postLikes }) => postLikes);

  useEffect(() => {
    dispatch(initializePosts());
    dispatch(initializePostLikes());
  }, [postLikes.length]);

  const handleDeletePost = (postId) => {
    postService.setToken(loggedUser);
    dispatch(deletePost(postId));
  };

  const handleLikePost = (postId) => {
    likeService.setToken(loggedUser);
    dispatch(likePost(postId));
  };

  return (
    <div className='posts-parent-container'>
      <h2>Posts</h2>
      <div className='posts-container'>
        {posts
          .filter((post) => post.hubId === hub.id)
          .map((post) => (
            <div key={post.id} className='post-container'>
              <Link
                className='post-link'
                to={`/posts/${post.id}`}
                state={{ post, hub, prevPath: `/hubs/${hub.id}` }}
              >
                <div className='post-content-container'>
                  <h2 className='post-title'>{post.title}</h2>
                  <h4 className='post-author'>{post.author}</h4>
                  <div>
                    Likes:{' '}
                    {
                      postLikes.filter((likes) => likes.postId === post.id)
                        .length
                    }
                  </div>
                </div>
              </Link>
              <div className='post-buttons-hub-container'>
                {loggedUser &&
                  !postLikes.find(
                    (likes) =>
                      likes.postId === post.id && likes.userId === loggedUser.id
                  ) && (
                    <button
                      className='like-post-button-hub'
                      onClick={() => handleLikePost(post.id)}
                    >
                      Like
                    </button>
                  )}
                {loggedUser?.username === post.author && (
                  <div>
                    <button
                      className='delete-post-button-hub'
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
