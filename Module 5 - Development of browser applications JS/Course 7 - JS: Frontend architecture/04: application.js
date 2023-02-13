// Реализуйте и экспортируйте функцию по умолчанию, которая активизирует фильтр на основе формы доступной в public/index.html. 
// Изменение любого параметра должно сразу приводить к фильтрации. 
// Ноутбуки, подходящие под фильтр, выводятся внутри <div class="result"></div> как список ul/li моделей (свойство model внутри объекта представляющего ноутбук). 
// Полный список ноутбуков доступен в файле src/index.js.
// Условия:
// 1) Если фильтр пустой, то выводится все.
// 2) Если под фильтр ничего не подходит, то список не выводится.

export default (laptops) => {
  const state = {
    processorSelector: {
      filter: '',
      enable: false,
    },
    memorySelector: {
      filter: '',
      enable: false,
    },
    minInput: {
      filter: '',
      enable: false,
    },
    maxInput: {
      filter: '',
      enable: false,
    },
  };
  const render = (allLaptops) => {
    if (!document.querySelector('.result')) {
      const div = document.createElement('div');
      div.classList.add('result');
    }
    const div = document.querySelector('.result');
    if (document.querySelector('ul')) {
      document.querySelector('ul').remove();
    }

    const filterFn1 = (laptops1) => {
      if (state.processorSelector.enable) {
        return laptops1.filter((laptop) => laptop.processor === state.processorSelector.filter);
      }
      return laptops1;
    };

    const filterFn2 = (laptops2) => {
      if (state.memorySelector.enable) {
        return laptops2.filter((laptop) => laptop.memory === Number(state.memorySelector.filter));
      }
      return laptops2;
    };

    const filterFn3 = (laptops3) => {
      if (state.minInput.enable) {
        return laptops3.filter((laptop) => laptop.frequency >= Number(state.minInput.filter));
      }
      return laptops3;
    };

    const filterFn4 = (laptops4) => {
      if (state.maxInput.enable) {
        return laptops4.filter((laptop) => laptop.frequency <= Number(state.maxInput.filter));
      }
      return laptops4;
    };

    const filteredLaptops = filterFn4(filterFn3(filterFn2(filterFn1(allLaptops))));
    if (filteredLaptops.length === 0) {
      return;
    }
    const ul = document.createElement('ul');
    div.appendChild(ul);
    filteredLaptops.map((laptop) => {
      const li = document.createElement('li');
      li.textContent = laptop.model;
      ul.append(li);
      return null;
    });
    document.body.append(div);
  };
  render(laptops);

  const processorSelector = document.querySelector('[name="processor_eq"]');
  const memorySelector = document.querySelector('[name="memory_eq"]');
  const minInput = document.querySelector('[name="frequency_gte"]');
  const maxInput = document.querySelector('[name="frequency_lte"]');

  processorSelector.addEventListener('change', (e) => {
    const filter = e.target.value;
    if (filter === '') {
      state.processorSelector.enable = false;
    } else {
      state.processorSelector.enable = true;
      state.processorSelector.filter = filter;
    }
    render(laptops);
  });

  memorySelector.addEventListener('change', (e) => {
    const filter = e.target.value;
    if (filter === '') {
      state.memorySelector.enable = false;
    } else {
      state.memorySelector.enable = true;
      state.memorySelector.filter = filter;
    }
    render(laptops);
  });

  minInput.addEventListener('input', (e) => {
    const filter = e.target.value;
    if (filter === '') {
      state.minInput.enable = false;
    } else {
      state.minInput.enable = true;
      state.minInput.filter = filter;
    }
    render(laptops);
  });

  maxInput.addEventListener('input', (e) => {
    const filter = e.target.value;
    if (filter === '') {
      state.maxInput.enable = false;
    } else {
      state.maxInput.enable = true;
      state.maxInput.filter = filter;
    }
    render(laptops);
  });
};

/* __tests__ */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const laptops = [
  {
    model: 'v1', processor: 'intel', frequency: 1.7, memory: 16,
  },
  {
    model: 'd3', processor: 'intel', frequency: 3.5, memory: 8,
  },
  {
    model: 'd2', processor: 'amd', frequency: 2.5, memory: 16,
  },
];

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run(laptops);
});

test('working process', async () => {
  const result = document.querySelector('.result');
  expect(result).toHaveTextContent('v1');
  expect(result).toHaveTextContent('d3');
  expect(result).toHaveTextContent('d2');

  const processor = await screen.findByLabelText('Processor');
  await userEvent.selectOptions(processor, 'Intel');
  const memory = await screen.findByLabelText('Memory');
  await userEvent.selectOptions(memory, '8');
  expect(result).toHaveTextContent('d3');
  expect(result).not.toHaveTextContent('v1');
  expect(result).not.toHaveTextContent('d2');

  await userEvent.selectOptions(processor, 'AMD');
  expect(result).not.toHaveTextContent('d3');
  expect(result).not.toHaveTextContent('v1');
  expect(result).not.toHaveTextContent('d2');

  await userEvent.selectOptions(processor, 'Intel');
  expect(result).toHaveTextContent('d3');
  expect(result).not.toHaveTextContent('v1');
  expect(result).not.toHaveTextContent('d2');

  await userEvent.selectOptions(processor, '');
  await userEvent.selectOptions(memory, '');

  const frequencyMin = await screen.findByLabelText('Frequency Min');
  await userEvent.type(frequencyMin, '3');
  expect(result).toHaveTextContent('d3');
  expect(result).not.toHaveTextContent('v1');
  expect(result).not.toHaveTextContent('d2');

  await userEvent.clear(frequencyMin);
  expect(result).toHaveTextContent('v1');
  expect(result).toHaveTextContent('d3');
  expect(result).toHaveTextContent('d2');

  await userEvent.type(frequencyMin, '4');
  expect(result).toBeEmptyDOMElement();

  await userEvent.clear(frequencyMin);
  await userEvent.type(frequencyMin, '1');
  expect(result).toHaveTextContent('v1');
  expect(result).toHaveTextContent('d3');
  expect(result).toHaveTextContent('d2');

  const frequencyMax = await screen.findByLabelText('Frequency Max');
  await userEvent.type(frequencyMax, '2');
  expect(result).toHaveTextContent('v1');
  expect(result).not.toHaveTextContent('d3');
  expect(result).not.toHaveTextContent('d2');

  await userEvent.clear(frequencyMin);
  await userEvent.clear(frequencyMax);
  // const memory = await screen.findByLabelText('Memory');
  await userEvent.selectOptions(memory, '16');
  expect(result).toHaveTextContent('v1');
  expect(result).toHaveTextContent('d2');
  expect(result).not.toHaveTextContent('d3');
});

test('initial state', async () => {
  const result = document.querySelector('.result');
  expect(result).toHaveTextContent('v1');
  expect(result).toHaveTextContent('d3');
  expect(result).toHaveTextContent('d2');
});
