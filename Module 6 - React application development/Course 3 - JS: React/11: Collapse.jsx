// Реализуйте компонент <Collapse>, который по клику на ссылке отображает или скрывает свое содержимое. Если содержимое скрыто, то клик раскрывает его. 
// И наоборот - если содержимое отображается, то клик скрывает контент. Содержимое передается в компонент через свойство text. 
// За начальное состояние открытости, отвечает свойство opened, которое по умолчанию равно true.
// После клика к классу collapse элемента <div> добавляется класс show, a значение атрибута aria-expanded меняется на true.

import React from 'react';
import cn from 'classnames';

export default class Collapse extends React.Component {
  constructor(props) {
    super(props);
    const { opened } = this.props;
    this.state = { button: opened };
  }

  isShown = () => this.setState(() => {
    const { button } = this.state;
    return { button: !button };
  });

  render() {
    const { text } = this.props;
    const { button } = this.state;
    const divValue = cn('collapse', {
      show: button,
    });
    return (
      <div>
        <p>
          <a className="btn btn-primary" data-bs-toggle="collapse" href="#" role="button" aria-expanded={button} onClick={this.isShown}>Link with href</a>
        </p>
        <div className={divValue}>
          <div className="card card-body">
            {text}
          </div>
        </div>
      </div>
    );
  }
}

Collapse.defaultProps = {
  opened: true,
};

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import Collapse from './Collapse.jsx';

const text = 'collapse me';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Collapse text={text} />);

/* __tests__ */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Collapse from '../src/Collapse.jsx';

test('Collapse', () => {
  const vdom = <Collapse text="hi" opened={false} />;
  const wrapper = render(vdom);
  expect(wrapper.asFragment()).toMatchSnapshot();

  const button = wrapper.getByText('Link with href');

  fireEvent.click(button);
  expect(wrapper.asFragment()).toMatchSnapshot();

  fireEvent.click(button);
  expect(wrapper.asFragment()).toMatchSnapshot();

  fireEvent.click(button);
  expect(wrapper.asFragment()).toMatchSnapshot();
});

test('Collapse2', () => {
  const vdom = <Collapse text="i am grut" />;
  const wrapper = render(vdom);
  expect(wrapper.asFragment()).toMatchSnapshot();
});
