# В этом испытании вам предлагается поработать с бэкенд-приложением интернет-магазина с помощью Postman.
# Ниже список запросов, которые есть в приложении:

# GET /api/products — возвращает список товаров на продажу. Пример возвращаемых данных:

# [
# {
#   "id": "1",
#   "title": "Автомобиль",
#   "description": "Эффективное средство передвижения",
#   "price": 999999
# },
# {
#   "id": "2",
#   "title": "Компьютер",
#   "description": "Электронно-вычислительная машина, помогает в различных задачах",
#   "price": 25000
# }
# ]

# GET /api/products/:id — получение данных о товаре. Пример ответа:

# {
# "id": 8,
# "title": "Кефир",
# "description": "Кисломолочный продукт",
# "price": 68
# }

# POST /api/products — добавляет новый товар в магазин. Требуется авторизация. Пример тела запроса:

# {
# "title": "Простокваша",
# "description": "Кисломолочный продукт",
# "price": 48
# }

# Пример ответа:

# {
# "id": 8,
# "title": "Простокваша",
# "description": "Кисломолочный продукт",
# "price": 48
# }

# PATCH /api/products/:id — обновление данных о товаре. Требуется авторизация. Пример тела запроса:

# {
# "id": 8,
# "title": "Кефир",
# "description": "Кисломолочный продукт",
# "price": 68
# }

# Пример ответа:

# {
# "id": 8,
# "title": "Кефир",
# "description": "Кисломолочный продукт",
# "price": 68
# }

# DELETE /api/products/:id — удаление товара. Требуется авторизация.

# POST /api/login — аутентификация. Пример тела запроса:

# { "username":"111111", "password":"111111" }

# Пример ответа:

# {
# "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY3MjMxNjU0Nn0.d58qv6_e6QWJev4OqEtLTriSzMmqnWY2ltFA8ilwY6M",
# "username": "111111"
# }

# POST /api/signup — создание нового пользователя. Пример тела запроса:

# {"username":"111111","password":"111111","phoneNumber":"111111"}

# Примет ответа:

# {
# "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY3MjMxNjU0Nn0.d58qv6_e6QWJev4OqEtLTriSzMmqnWY2ltFA8ilwY6M",
# "username": "111111"
# }

# POST /api/cart — добавление товара в корзину. Требуется авторизация. Пример тела запроса:

# {
# "id": 8,
# "title": "Кефир",
# "description": "Кисломолочный продукт",
# "price": 68,
# "count": 2
# }

# GET /api/cart — получение корзины. Требуется авторизация. Пример ответа:

# {
# "userId": 7,
# "products": [
#   {
#     "id": 8,
#     "title": "Кефир",
#     "description": "Кисломолочный продукт",
#     "price": 68,
#     "count": 2
#   }
# ]
# }

# POST /api/orders — добавление заказа. В заказ попадают товары, которые были добавлены в корзину авторизованного пользователя. Требуется авторизация. После добавления заказа, корзина становится пустой. Пример ответа:

# {
# "userId": 7,
# "id": "10",
# "date": "2022-12-29T12:33:34.842Z",
# "products": [
#   {
#     "id": 8,
#     "title": "Кефир",
#     "description": "Кисломолочный продукт",
#     "price": 68,
#     "count": 2
#   }
# ]
# }

# GET /api/orders — получение списка заказов авторизованного пользователя. Требуется авторизация. Пример ответа:

# [
# {
#   "userId": 7,
#   "id": "10",
#   "date": "2022-12-29T12:33:34.842Z",
#   "products": [
#     {
#       "id": 8,
#       "title": "Кефир",
#       "description": "Кисломолочный продукт",
#       "price": 68,
#       "count": 2
#     }
#   ]
# }
# ]

# GET /api/orders/:id — получение заказа Пример ответа:

# {
# "userId": 7,
# "id": "10",
# "date": "2022-12-29T12:33:34.842Z",
# "products": [
#   {
#     "id": 8,
#     "title": "Кефир",
#     "description": "Кисломолочный продукт",
#     "price": 68,
#     "count": 2
#   }
# ]
# }

# DELETE /api/orders/:id — удаление заказа. Требуется авторизация.

# Установите Postman или любой другой инструмент для выполнения http-запросов и протестируйте эти запросы.
# Так же вам доступен веб-доступ, вы можете проверить как отрабатывают запросы во фронтенд-приложении через devtools.
# Чтобы получить полный адрес запроса, зайдите в веб-доступ и скопируйте урл страницы. Соедините этот урл с адресом запроса.
# Например, так может выглядеть адрес получения списка товаров:
# https://web-testing-phase-testing-system-4643087.evaluator6-5.hexlet.io/api/products — к урл добавлено /api/products.

# В запросах вместо :id подставляется идентификатор сущности. Например запрос PATCH /api/products/7 редактирует товар с идентификатором 7.
# В запросах, где требуется авторизация, в заголовках запроса должен идти специальный токен — он нужен, чтобы сервер правильно определил пользователя,
# от которого идет запрос. Для этого в Postman, на вкладке Authorization укажите Bearer Token.
# Перед этим вы должны получить этот токен отправив запрос на создание пользователя или запрос аутентификации.
# При работе из терминала упражнения используйте localhost и порт 8080.

# С помощью http-запроса создайте товар с именем "Светильник" и ценой 1000 json { "title": "Светильник", "price": 1000 }
# Сделайте get-запрос на получение данных об этом товаре
# В ответе на запрос, если имя и цена совпадают, в данных товара будет дополнительно специальный ключ key. Запишите этот ключ в файл solution

# Например:
# GET /api/products/12
 
# {
#   "id": "12",
#   "title": "Светильник",
#   "price": 1000,
#   "key": "Vwe7x%x:`t*Os}^!v`Qe"
# }
# Ключ нужно записать без кавычек, то есть, из примера выше, правильный ответ будет Vwe7x%x:`t*Os}^!v`Qe

# solution

S~L0n-L&F3w#4..9e6x.

# __fixtures__/text

U35MMG4tTCZGM3cjNC4uOWU2eC4K

# __tests__

import fs from 'fs';

const getTestCases = (filePath, encode = false) => {
  const source = fs.readFileSync(filePath, 'utf-8');
  const content = encode ? Buffer.from(source, 'base64').toString('utf8') : source;
  const cases = content.split('\n').filter((item) => item.trim() !== '' && !item.startsWith('#'));
  return cases;
};

const compareAnswers = (answers1, answers2) => {
  if (answers1.length !== answers2.length) {
    throw Error('Ответ неверный!');
  }
  for (let i = 0; i < answers1.length; i += 1) {
    if (answers1[i] !== answers2[i]) {
      throw Error('Ответ неверный!');
    }
  }
};

const userAnswers = getTestCases('solution').sort();
const answers = getTestCases('__fixtures__/text', true).sort();

it('solution', async () => {
  expect(() => compareAnswers(answers, userAnswers)).not.toThrow();
});
