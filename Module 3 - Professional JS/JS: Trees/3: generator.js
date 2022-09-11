import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';

const generate = () => {
  const tree = mkdir('nodejs-package', [
    mkfile('Makefile'),
    mkfile('README.md'),
    mkdir('dist', []),
    mkdir('__tests__', [
      mkfile('half.test.js', { type: 'text/javascript' }),
    ]),
    mkfile('babel.config.js', { type: 'text/javascript' }),
    mkdir('node_modules', [
      mkdir('@babel', [
        mkdir('cli', [
          mkfile('LICENSE'),
        ]),
      ]),
    ], { owner: 'root', hidden: false }),
  ], { hidden: true });

  return tree;
};

export default generate;

/* __tests__ */

import generate from '../generator.js';

test('generate', () => {
  const expectation = ({
    name: 'nodejs-package',
    meta: { hidden: true },
    children: [
      { name: 'Makefile' },
      { name: 'README.md' },
      { name: 'dist' },
      {
        name: '__tests__',
        children: [
          { name: 'half.test.js', meta: { type: 'text/javascript' } },
        ],
      },
      { name: 'babel.config.js', meta: { type: 'text/javascript' } },
      {
        name: 'node_modules',
        meta: { owner: 'root', hidden: false },
        children: [
          {
            name: '@babel',
            children: [
              {
                name: 'cli',
                children: ([
                  {
                    name: 'LICENSE',
                  },
                ]),
              },
            ],
          },
        ],
      },
    ],
  });
  const tree = generate();

  expect(tree).toMatchObject(expectation);
});
