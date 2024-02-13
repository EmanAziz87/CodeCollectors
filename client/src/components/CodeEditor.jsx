import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import '../prism/languageImports';

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
    <div>
      <select
        id='languages'
        name='selectedLanguage'
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {langFormat(lang)}
          </option>
        ))}
      </select>
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        padding={10}
        highlight={(code) =>
          Prism.highlight(code, Prism.languages[language.toLowerCase()])
        }
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
