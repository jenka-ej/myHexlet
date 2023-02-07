<?php

// Напишите регулярное выражение, которое находит строки, удовлетворяющие одному из условий:
// 1) Строка содержит группу из 4 цифр, перед которой следует строка code.
// 2) Строка содержит подстроку ____, перед которой нет строки code.
// Используйте поиск по условию.

(?(?<=code)\d{4}|____)

/* __tests__ */

namespace Hexlet\App;

use PHPUnit\Framework\TestCase;

class SolutionTest extends TestCase
{
    public function testRegexp()
    {
        $parts = [__DIR__, '../solution'];
        $raw = trim(file_get_contents(implode('/', $parts)));
        $regExp = "/$raw/";
        $this->assertMatchesRegularExpression($regExp, 'code1234');
        $this->assertMatchesRegularExpression($regExp, '____');
        $this->assertDoesNotMatchRegularExpression($regExp, 'code123');
        $this->assertDoesNotMatchRegularExpression($regExp, 'code____');
        $this->assertDoesNotMatchRegularExpression($regExp, 'codenone');
    }
}
