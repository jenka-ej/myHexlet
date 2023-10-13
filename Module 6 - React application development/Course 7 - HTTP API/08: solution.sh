# В этом упражнении мы познакомимся с тем, как работает JSON RPC.
# Пример запроса:
# curl -X POST \
#     -H 'Content-Type: application/json' \
#     -d '{"jsonrpc":"2.0","id":1,"method":"echo","params":{"text": "Hello, World!"}}' \
#     http://localhost:8080/rpc

# Метод greet принимает параметр name и отправляет в ответ приветствие.
# Используя curl выполните запрос к localhost на порт 8080 по пути /json-rpc. Передайте в теле запроса метод greet и параметр name со значением Tota.
# Запишите получившуюся команду в файл greet

# Метод get_users возвращает в ответ список пользователей.
# Используя curl выполните запрос к localhost на порт 8080 по пути /json-rpc. Передайте в теле запроса метод get_users.
# Данный метод не принимает никаких параметров.
# Запишите получившуюся команду в файл get_users.

# Не забудьте указать id в теле запроса, этого требует спецификация.

# greet.sh

curl -X POST \
-H 'Content-Type: application/json' \
-d '{"jsonrpc":"2.0","id":1,"method":"greet","params":{"name": "Tota"}}' \
http://localhost:8080/json-rpc

# get_users.sh

curl -X POST \
-H 'Content-Type: application/json' \
-d '{"jsonrpc":"2.0","id":1,"method":"get_users"}' \
http://localhost:8080/json-rpc

# __fixtures__/users.json

{"jsonrpc":"2.0", "result":[{"id":1,"name":"Tota"},{"id":2,"name":"Antony"},{"id":3,"name":"John"},{"id":4,"name":"Mia"}]}

# server/index.js

import fastify from 'fastify';
import { JSONRPCServer } from 'json-rpc-2.0';

const server = new JSONRPCServer();

const users = [
  {
    id: 1,
    name: 'Tota',
  },
  {
    id: 2,
    name: 'Antony',
  },
  {
    id: 3,
    name: 'John',
  },
  {
    id: 4,
    name: 'Mia',
  },
];

server.addMethod('greet', ({ name }) => `Hello, ${name}!`);
server.addMethod('get_users', () => users);

export default () => {
  const app = fastify();

  app.server.keepAliveTimeout = 1;

  app.get('/', (req, res) => {
    res.send('Server is running!');
  });

  app.post('/json-rpc', (req, res) => {
    const jsonRPCRequest = req.body;

    server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
      if (jsonRPCResponse) {
        res.send(jsonRPCResponse);
      } else {
        res.code(204);
      }
    });
  });

  return app;
};

# __tests__

import fs from 'fs';
import url from 'url';
import path from 'path';
import { execSync } from 'child_process';
import users from '../__fixtures__/users.json'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('greet', async () => {
  const command = fs.readFileSync('greet', 'utf-8')
    .toString()
    .trim();

  const response = execSync(command);
  const { result } = JSON.parse(response);

  expect(result).toEqual('Hello, Tota!');
});

test('users', async () => {
  const command = fs.readFileSync('get_users', 'utf-8')
    .toString()
    .trim();

  const response = execSync(command).toString().trim();
  expect(JSON.parse(response)).toMatchObject(users);
});

