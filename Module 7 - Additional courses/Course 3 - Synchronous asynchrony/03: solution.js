// В сети существует такая игра: вы получаете исходную ссылку на wiki страницу и необходимо за минимальное количество переходов дойти
// до статьи на заданную тему. Переходы осуществляются по любым ссылкам на странице, которые не выводят поиски за рамки википедии.

// Реализуйте и экспортируйте по умолчанию функцию для поиска статьи на заданную тему по алгоритму описанному выше,
// кроме требования "за минимальное количество переходов". Проверку на внешние ссылки делать не надо. Наша цель асинхронность, а не сложность алгоритма.

// Принимаемые параметры:

// title - название темы. Поиск должен происходить по точному соответствию.
// address - ссылка на страницу с которой будет производится поиск.
// callback - функция обратного вызова, в которую передается адрес найденной страницы либо ошибка. Ошибка возникает, например, в случае если были просмотрены все ссылки, а статья не найдена.

// Важно учитывать:
// В статьях могут быть взаимные ссылки, поэтому необходимо отслеживать то что уже было посещено, чтобы не возникало бесконечной рекурсии.

// Пример:
// import solution from './solution';
 
// solution('операция', 'http://localhost:8080', (err, data) => {
//   console.log(data); // http://localhost:8080/operator
// });

// Все страницы имеют такую структуру:
// <html>
//   <head>
//     <title></title>
//   </head>
//   <body>
//     <h1>Википедия</h1>
//     <p>Как вы знаете, вики это большая база знаний обо всем на свете.
//       Наш сайт это не настоящая <a href="https://www.wikipedia.org/">википедия</a>,
//       но кое что мы сюда добавили).</p>
//     <p>Например статью про <a href="/operators">операции</a>, а так же статьи про
//       <a href="/expressions">выражения</a> и <a href="/statements">инструкции</a></p>
//   </body>
// </html>

// Заголовок h1 содержит точное название темы.
// Под заголовком абзац(ы) с произвольным текстом внутри которого встречаются ссылки по которым и нужно ходить.
// Подсказки:
// Для извлечения данных из текста воспользуйтесь функциями getTitle() и getLinks()

// @ts-check

import url from 'url';
import http from 'http';

const getTitle = (body) => body.match(/<h1>(.*?)<\/h1>/)[1];
const getLinks = (body) => (body.match(/href="\/(.*?)">/g) || [])
  .map((item) => item.match(/href="\/(.*?)">/)[1]);

export default function solution(title, mainAdress, callback) {
  const { URL } = url;
  const visitedLinks = [];
  const queueLinks = [mainAdress];
  let end = false;
  const visit = (adress) => {
    if (end) {
      return;
    }
    http.get(adress, (res) => {
      const body = [];
      res.on('data', (chunk) => {
        body.push(chunk.toString());
      }).on('end', () => {
        visitedLinks.push(adress);
        const html = body.join();
        const mainTitle = getTitle(html);
        if (mainTitle === title) {
          end = true;
          return callback(new Error('Error'), adress);
        }
        const anotherLinks = getLinks(html).filter((link) => {
          const fullLink = new URL(link, mainAdress).toString();
          return !visitedLinks.includes(fullLink) && !queueLinks.includes(fullLink);
        }).map((link) => new URL(link, mainAdress).toString());
        queueLinks.push(...anotherLinks);
        if (anotherLinks.length === 0 && queueLinks.sort().join('') === visitedLinks.sort().join('')) {
          return callback(new Error('Error'));
        }
        return anotherLinks.forEach((link) => visit(link));
      });
    });
  };
  visit(mainAdress);
}

/* __tests__ */

import solution from '../solution.js';

describe('Request', () => {
  it('set 1', () => {
    const link = 'http://localhost:8080/';
    const title = 'Википедия';
    return new Promise((done) => {
      solution(title, link, (err, result) => {
        expect(result).toBe(link);
        done(err);
      });
    });
  });

  it('set 2', () => {
    const link = 'http://localhost:8080';
    const title = 'Инструкции';
    return new Promise((done) => {
      solution(title, link, (err, result) => {
        expect(result).toBe(`${link}/statements`);
        done(err);
      });
    });
  });

  it('set 3', () => {
    const link = 'http://localhost:8080';
    const title = 'Выражения';
    return new Promise((done) => {
      solution(title, link, (err, result) => {
        expect(result).toBe(`${link}/expressions`);
        done(err);
      });
    });
  });

  it('set 4', () => {
    const link = 'http://localhost:8080';
    const title = 'Операции';
    return new Promise((done) => {
      solution(title, link, (err, result) => {
        expect(result).toBe(`${link}/operators`);
        done(err);
      });
    });
  });

  it('set 5', () => {
    const link = 'http://localhost:8080';
    const title = 'Нафинг';
    return new Promise((done) => {
      solution(title, link, (err) => {
        expect(err).not.toBeNull();
        done();
      });
    });
  });
});
