import { table, tr, td } from './tags.js';

const buildHtml = () => {
  const result = table(
    tr(td('lang'), td('comment')),
    tr(td('php'), td('statements')),
    tr(td('clojure'), td('expressions')),
  );
  return result;
};
export default buildHtml;

/* __tests__ */

import jsBeautify from 'js-beautify';
import buildHtml from '../buildHtml.js';

const { html } = jsBeautify;

test('htmlBuilder', () => {
  expect(html(buildHtml())).toMatchSnapshot();
});
