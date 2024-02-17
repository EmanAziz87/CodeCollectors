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
                to={`/posts/${post.id}`}
                state={{ post, hub, prevPath: `/hubs/${hub.id}` }}
              >
                {post.title} by {post.author}
              </Link>

              <div>
                Likes:{' '}
                {postLikes.filter((likes) => likes.postId === post.id).length}
              </div>

              <br />
              {loggedUser?.username === post.author && (
                <div>
                  <button onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </button>
                </div>
              )}
              {loggedUser &&
                !postLikes.find(
                  (likes) =>
                    likes.postId === post.id && likes.userId === loggedUser.id
                ) && (
                  <button onClick={() => handleLikePost(post.id)}>Like</button>
                )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
