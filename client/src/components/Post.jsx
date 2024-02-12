import CommentForm from './CommentForm';
import Comments from './Comments';
import EditPostForm from './EditPostForm';
import Snippets from './Snippets';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeSnippets } from '../reducers/snippetsReducer';
import { useEffect, useState } from 'react';

const Post = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const snippets = useSelector(({ snippets }) => snippets);
  const loggedUser = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeSnippets());
  }, []);

  const matchingSnippet = snippets.find(
    (snippet) => snippet.id === state.post.snippetId
  );

  console.log(state.post);

  return (
    <div>
      <button
        onClick={() => navigate(state.prevPath, { state: { hub: state.hub } })}
      >
        Go Back
      </button>
      {loggedUser?.username === state.post.author && matchingSnippet && (
        <div>
          <Link
            to='/editPostForm'
            state={{
              post: state.post,
              snippet: matchingSnippet,
              hub: state.hub,
              prevPath: `/posts/${state.post.id}`,
              prevPrevPath: state.prevPath,
            }}
          >
            Edit Post
          </Link>
          {/* <EditPostForm
            prevTitle={state.post.title}
            prevSnippetTitle={matchingSnippet.title}
            prevPostContent={state.post.content}
            prevCode={matchingSnippet.content}
            snippetId={matchingSnippet.id}
            post={state.post}
            hub={state.hub}
            showEditForm={setReveal}
          /> */}
        </div>
      )}
      <div>
        <div>Title: {state.post.title}</div>
        <div> Author: {state.post.author}</div>
        <div>Content: {state.post.content}</div>
        <Snippets post={state.post} postsFromHub={true} />

        <div>
          <CommentForm post={state.post} parentId={null} />
          <Comments post={state.post} />
        </div>
      </div>
    </div>
  );
};

export default Post;
