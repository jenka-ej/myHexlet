// Реализуйте и экспортируйте по умолчанию функцию, которая принимает cтроку в виде графического представления линейного сигнала и возвращает строку с бинарным кодом.

const nrzi = (signal) => {
  if (signal.length === 0 || signal.length === 1) {
    return '';
  }
  const result = [];
  for (let i = 0; i < signal.length; i += 1) {
    if (signal[i] === '|') {
      i += 1;
      result.push('1');
    } else {
      result.push('0');
    }
  }
  return result.join('');
};
export default nrzi;

/* __tests__ */

import nrzi from '../solution.js';

describe('NRZI', () => {
  it('test econding transmission empty', () => {
    const result = nrzi('');
    expect(result).toEqual('');
  });

  it('test econding transmission first signal invalid', () => {
    const result = nrzi('|');
    expect(result).toEqual('');
  });

  it('test encoding', () => {
    const result = nrzi('¯|__|¯|___|¯¯');
    expect(result).toEqual('010110010');

    const result2 = nrzi('_|¯¯¯|_|¯¯¯¯|_|¯¯');
    expect(result2).toEqual('010011000110');

    const result3 = nrzi('¯|___|¯¯¯¯¯|___|¯|_|¯');
    expect(result3).toEqual('010010000100111');

    const result4 = nrzi('|¯|___|¯¯¯¯¯|___|¯|_|¯');
    expect(result4).toEqual('110010000100111');
  });
});
