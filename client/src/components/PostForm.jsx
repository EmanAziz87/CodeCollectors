import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../reducers/postsReducer';
import postService from '../services/posts';
import CodeEditor from './CodeEditor';

const PostForm = ({ hub }) => {
  const [title, setTitle] = useState('');
  const [snippetTitle, setSnippetTitle] = useState('');
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');

  console.log('TITLE: ', title);
  console.log('CONTENT: ', content);
  console.log('SNIPPET TITLE: ', snippetTitle);
  console.log('CODE: ', code);

  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  const handleAddPost = (event) => {
    event.preventDefault();

    postService.setToken(loggedUser);
    dispatch(
      createPost(
        { title, content },
        { title: snippetTitle, content: code },
        hub
      )
    );
    setTitle('');
    setSnippetTitle('');
    setContent('');
    setCode('');
  };

  return (
    <div>
      <form onSubmit={handleAddPost}>
        <div>
          <div>
            <div>
              <label htmlFor='post-form-title'>Post Title: </label>
            </div>
            <input
              type='text'
              id='post-form-title'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor='post-form-content'>Content: </label>
          </div>
          <textarea
            id='post-form-description'
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={5}
            cols={40}
          />
        </div>
        <div>
          <label htmlFor='post-form-snippet-title'>Snippet Title: </label>
        </div>
        <input
          type='text'
          id='post-form-snippet-title'
          value={snippetTitle}
          onChange={(event) => setSnippetTitle(event.target.value)}
        />
        <CodeEditor setCode={setCode} code={code} />
        <button type='submit'>Add</button>
      </form>
      {/* <div>
        <pre>
          <code className='language-javascript'>{content}</code>
        </pre>
      </div> */}
    </div>
  );
};

export default PostForm;
