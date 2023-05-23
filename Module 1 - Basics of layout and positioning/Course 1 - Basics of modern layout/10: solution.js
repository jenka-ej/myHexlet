<!-- Запишите в файле solution команду Emmet, которая преобразуется в следующий шаблон для резюме:

<main>
  <h1>Резюме</h1>
  <h2>Разработчик веб-приложений</h2>
  <section class="study">
    <h2>Образование</h2>
    <ul>
      <li class="place-of-study">Место учёбы №1</li>
      <li class="place-of-study">Место учёбы №2</li>
      <li class="place-of-study">Место учёбы №3</li>
    </ul>
  </section>
</main>

Вам необходимо написать только команду Emmet. Тесты сами преобразуют её в HTML-разметку и проверят с оригиналом. -->

main>h1{Резюме}+h2{Разработчик веб-приложений}+(section.study>h2{Образование}+ul>li.place-of-study*3{Место учёбы №$})

<!-- __tests__ -->

const fs = require('fs');
const emmet = require('emmet');

test(("HTML must be equal to the reference"), () => {
  const solution = fs.readFileSync(`${__dirname}/../solution`, "utf-8").trim();
  const html = emmet.default(solution);

  expect(html).toMatchSnapshot();
});
