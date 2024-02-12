import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializePosts, deletePost } from '../reducers/postsReducer';
import postService from '../services/posts';
import '../css/posts.css';

const Posts = ({ hub }) => {
  const dispatch = useDispatch();
  const posts = useSelector(({ posts }) => posts);
  const loggedUser = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializePosts());
  }, []);

  const handleDeletePost = (postId) => {
    postService.setToken(loggedUser);
    dispatch(deletePost(postId));
  };

  return (
    <div>
      <h2>Posts</h2>
      <div>
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
              <br />
              {loggedUser?.username === post.author && (
                <button onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
