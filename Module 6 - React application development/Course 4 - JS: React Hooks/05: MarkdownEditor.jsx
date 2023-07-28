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

import React, { useRef, useEffect } from 'react';
import Editor from '@toast-ui/editor';

const MarkdownEditor = ({ onContentChange }) => {
  const divEl = useRef(null);

  useEffect(() => {
    const editor = new Editor({
      el: divEl.current,
      hideModeSwitch: true,
    });

    editor.addHook('change', () => onContentChange(editor.getMarkdown()));
  });

  return (
    <div id="editor" ref={divEl} />
  );
};

export default MarkdownEditor;

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';

import MarkdownEditor from './MarkdownEditor.jsx';

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
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

test('MarkdownEditor', async () => {
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
