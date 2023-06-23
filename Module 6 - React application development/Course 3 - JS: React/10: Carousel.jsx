// Реализуйте компонент, эмулирующий работу слайдера. Компонент принимает на вход свойство images, в котором находится список путей до картинок. 
// Компонент отображает их и позволяет с помощью стрелок "вперёд" и "назад" осуществлять переход по ним. Сам переход зациклен. Картинки (пути до них) могут повторятся.

// Ниже описано поведение:
// 1) Если выбрана последняя картинка, то next ведёт на первую. То же самое происходит и prev, но в обратную сторону
// 2) Первая картинка становится активной. Порядок картинок и их отображение должны сохраняться

import React from 'react';
import cn from 'classnames';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: 1 };
  }

  nextClick = () => this.setState((state) => {
    const { images } = this.props;
    if (state.active === images.length) {
      return { active: 1 };
    }
    return { active: state.active + 1 };
  });

  prevClick = () => this.setState((state) => {
    const { images } = this.props;
    if (state.active === 1) {
      return { active: images.length };
    }
    return { active: state.active - 1 };
  });

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div id="carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((src, index) => {
            const keyValue = index + 1;
            const classValue = cn('carousel-item', {
              active: active === keyValue,
            });
            return (
              <div key={keyValue} className={classValue}>
                <img alt="" className="d-block w-100" src={src} />
              </div>
            );
          })}
        </div>
        <button className="carousel-control-prev" data-bs-target="#carousel" type="button" data-bs-slide="prev" onClick={this.prevClick}>
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" data-bs-target="#carousel" type="button" data-bs-slide="next" onClick={this.nextClick}>
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import Carousel from './Carousel.jsx';

const images = ['/images/first.jpeg', '/images/second.jpeg', '/images/third.jpeg'];

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Carousel images={images} />);

/* __tests__ */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from '../src/Carousel.jsx';

test('Carousel', async () => {
  const images = ['/images/first.jpeg', '/images/second.jpeg', '/images/third.jpeg'];
  const vdom = <Carousel images={images} />;
  const { asFragment } = render(vdom);
  expect(asFragment()).toMatchSnapshot();

  // const next = wrapper.find('.carousel-control-next');
  const next = () => screen.getByRole('button', { name: 'Next' });
  const prev = () => screen.getByRole('button', { name: 'Previous' });
  // const prev = wrapper.find('.carousel-control-prev');

  await userEvent.click(next());
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(next());
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(next());
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(prev());
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(prev());
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(prev());
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(prev());
  expect(asFragment()).toMatchSnapshot();
});

test('Carousel 2', async () => {
  const images = ['/images/1.jpeg', '/images/2.jpeg', '/images/3.jpeg'];
  const vdom = <Carousel images={images} />;
  const { asFragment } = render(vdom);
  expect(asFragment()).toMatchSnapshot();

  const next = () => screen.getByText('Next');

  await userEvent.click(next());
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(next());
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(next());
  expect(asFragment()).toMatchSnapshot();
});
