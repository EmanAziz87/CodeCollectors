import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import '../prism/languageImports';

const CodeEditor = ({ setCode, code }) => {
  return (
    <div>
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        padding={10}
        highlight={(code) => Prism.highlight(code, Prism.languages.js)}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          backgroundColor: 'rgb(39,40,34)',
          color: 'white',
        }}
      />
    </div>
  );
};

export default CodeEditor;
