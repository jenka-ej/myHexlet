// Реализуйте компонент <MarkdownEditor />, который является React оберткой плагина @toast-ui/editor. 
// Этот плагин позволяет встроить в страницу Markdown-редактор.

// const editor = new Editor({
//   el: element,
//   hideModeSwitch: true,
// });
 
// editor.addHook('change', () => {
//   const content = editor.getMarkdown();
//   // код который будет вызван при изменении содержимого редактора
// });

// Компонент принимает на вход функцию как свойство onContentChange, которая вызывается при каждом изменении в редакторе. 
// Функция принимает на вход содержимое редактора. Его использование видно в файле src/index.jsx.
// Посмотреть пример работы редактора можно на странице документации.

import React from 'react';
import Editor from '@toast-ui/editor';

export default class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    const { onContentChange } = this.props;

    const editor = new Editor({
      el: document.querySelector('#editor'),
      hideModeSwitch: true,
    });

    editor.addHook('change', () => {
      const content = editor.getMarkdown();
      onContentChange(content);
    });
  }

  render() {
    return (
      <div ref={this.editorRef} id="editor" />
    );
  }
}

/* index.jsx */

import '@toast-ui/editor/dist/toastui-editor.css';

import ReactDOM from 'react-dom/client';
import React from 'react';

import MarkdownEditor from './MarkdownEditor.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<MarkdownEditor onContentChange={console.log} />);

/* __tests__ */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import MarkdownEditor from '../src/MarkdownEditor.jsx';

beforeAll(() => {
  document.createRange = () => ({
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => ({ right: 0 }),
    getClientRects: () => [],
  });

  document.body.innerHTML = '<div id="container"></div>';
});

it('MarkdownEditor', async () => {
  let value;
  const onContentChange = (v) => {
    value = v;
  };

  const container = document.getElementById('container');

  render(<div><MarkdownEditor onContentChange={onContentChange} /></div>, { container });
  const textarea = screen.getByRole('textbox');
  expect(textarea).toBeInTheDocument();

  await userEvent.type(textarea, 'l');
  expect(value).toBe('l');

  await userEvent.type(textarea, 'some text');
  expect(value).toBe('lsome text');

  await userEvent.type(textarea, '1');
  expect(value).toBe('lsome text1');
});
