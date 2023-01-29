// Реализуйте логику слайдера в функции экспортированной по умолчанию.
// Постройте свою логику так, чтобы она позволила использовать на одной странице любое количество компонентов carousel с любым количеством картинок внутри.
// Решите задачу, используя методы jQuery.

import $ from 'jquery';

export default () => {
  const buttons = $('[role="button"]');
  buttons.click((e) => {
    const type = e.currentTarget.dataset.slide;
    const carousel = $(e.currentTarget).parent();
    const active = $('.active', carousel);
    const carouselInner = $(active).parent();
    $(active).removeClass('active');
    if (type === 'next') {
      if ($(active).next().length === 0) {
        const first = $('.carousel-item', carouselInner).first();
        $(first).addClass('active');
        return null;
      }
      $(active).next().addClass('active');
      return null;
    }
    if ($(active).prev().length === 0) {
      const last = $('.carousel-item', carouselInner).last();
      $(last).addClass('active');
      return null;
    }
    $(active).prev().addClass('active');
    return null;
  });
};

/* __tests__ */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibraryDom from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const { screen, within } = testingLibraryDom;

const getElement = {
  firstSlider: () => screen.getByRole('group', { name: 'First' }),
  secondSlider: () => screen.getByRole('group', { name: 'Second' }),
  buttonNext: (slider) => within(slider).getByRole('button', { name: 'Next' }),
  buttonPrev: (slider) => within(slider).getByRole('button', { name: 'Previous' }),
  slide: (slider, name) => within(slider).getByRole('img', { name: new RegExp(name, 'im') }),
};

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('Next button, first slider', async () => {
  const buttonNext1 = getElement.buttonNext(getElement.firstSlider());
  await userEvent.click(buttonNext1);
  const firstSlide1 = getElement.slide(getElement.firstSlider(), 'First');
  const secondSlide1 = getElement.slide(getElement.firstSlider(), 'Second');

  expect(firstSlide1.parentNode).not.toHaveClass('active');
  expect(secondSlide1.parentNode).toHaveClass('active');

  const buttonNext2 = getElement.buttonNext(getElement.secondSlider());
  await userEvent.click(buttonNext2);
  const firstSlide2 = getElement.slide(getElement.secondSlider(), 'Third');
  const secondSlide2 = getElement.slide(getElement.secondSlider(), 'Fourth');

  expect(firstSlide2.parentNode).not.toHaveClass('active');
  expect(secondSlide2.parentNode).toHaveClass('active');
});

test('Prev button, second slider', async () => {
  const buttonPrev1 = getElement.buttonPrev(getElement.secondSlider());
  await userEvent.click(buttonPrev1);
  const firstSlide1 = getElement.slide(getElement.secondSlider(), 'Third');
  const secondSlide1 = getElement.slide(getElement.secondSlider(), 'Second');

  expect(firstSlide1.parentNode).not.toHaveClass('active');
  expect(secondSlide1.parentNode).toHaveClass('active');

  const buttonPrev2 = getElement.buttonPrev(getElement.secondSlider());
  await userEvent.click(buttonPrev2);
  await userEvent.click(buttonPrev2);
  const firstSlide2 = getElement.slide(getElement.secondSlider(), 'Second');
  const secondSlide2 = getElement.slide(getElement.secondSlider(), 'Fourth');

  expect(firstSlide2.parentNode).not.toHaveClass('active');
  expect(secondSlide2.parentNode).toHaveClass('active');
});

test('All sliders, all buttons', async () => {
  // prev

  const buttonPrev1 = getElement.buttonPrev(getElement.firstSlider());
  const buttonPrev2 = getElement.buttonPrev(getElement.secondSlider());
  await userEvent.click(buttonPrev1);
  await userEvent.click(buttonPrev2);

  const firstSlide1 = getElement.slide(getElement.firstSlider(), 'First');
  const secondSlide1 = getElement.slide(getElement.firstSlider(), 'Third');

  const firstSlide2 = getElement.slide(getElement.secondSlider(), 'Third');
  const secondSlide2 = getElement.slide(getElement.secondSlider(), 'Second');

  expect(firstSlide1.parentNode).not.toHaveClass('active');
  expect(secondSlide1.parentNode).toHaveClass('active');

  expect(firstSlide2.parentNode).not.toHaveClass('active');
  expect(secondSlide2.parentNode).toHaveClass('active');

  // next

  const buttonNext1 = getElement.buttonNext(getElement.firstSlider());
  const buttonNext2 = getElement.buttonNext(getElement.secondSlider());
  await userEvent.click(buttonNext1);
  await userEvent.click(buttonNext2);
  await userEvent.click(buttonNext2);

  const firstSlide3 = getElement.slide(getElement.firstSlider(), 'Second');
  const secondSlide3 = getElement.slide(getElement.firstSlider(), 'First');

  const firstSlide4 = getElement.slide(getElement.secondSlider(), 'Third');
  const secondSlide4 = getElement.slide(getElement.secondSlider(), 'Fourth');

  expect(firstSlide3.parentNode).not.toHaveClass('active');
  expect(secondSlide3.parentNode).toHaveClass('active');

  expect(firstSlide4.parentNode).not.toHaveClass('active');
  expect(secondSlide4.parentNode).toHaveClass('active');
});
