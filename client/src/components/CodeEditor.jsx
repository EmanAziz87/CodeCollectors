import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import '../prism/languageImports';
import '../css/codeEditor.css';

const CodeEditor = ({ setCode, code, language, setLanguage }) => {
  if (!language) {
    return null;
  }

  const languages = [
    'Java',
    'Bash',
    'C',
    'Clojure',
    'CoffeeScript',
    'C++',
    'csharp',
    'CSS',
    'Dart',
    'Docker',
    'Go',
    'Gradle',
    'Graphql',
    'Haskell',
    'JavaScript',
    'JSON',
    'Kotlin',
    'MongoDB',
    'ObjectiveC',
    'Perl',
    'Pug',
    'Python',
    'R',
    'RegEx',
    'Ruby',
    'Rust',
    'SASS',
    'Scala',
    'Swift',
    'TypeScript',
    'YAML',
    'JSX',
  ];

  const langFormat = (lang) => {
    switch (lang) {
      case 'csharp':
        return 'C#';
      case 'cpp':
        return 'C++';
      default:
        return lang;
    }
  };

  return (
    <div className='code-editor-parent-container'>
      <select
        id='languages'
        name='selectedLanguage'
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        {languages.map((lang) => (
          <option className='language-select-options' key={lang} value={lang}>
            {langFormat(lang)}
          </option>
        ))}
      </select>
      <div className='code-editor-container'>
        <Editor
          className='code-editor'
          value={code}
          onValueChange={(code) => setCode(code)}
          padding={10}
          highlight={(code) =>
            Prism.highlight(code, Prism.languages[language.toLowerCase()])
          }
          placeholder='//Type Some Code Here'
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: 'rgb(39,40,34)',
            width: '100%',
            height: '150px',
            borderRadius: '6px',
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
