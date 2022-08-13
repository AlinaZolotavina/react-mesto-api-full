/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYzYTMyMDI1YmMxMDEwNzRhNDhjYzkiLCJpYXQiOjE2NjA0MDU0MjQsImV4cCI6MTY2MTAxMDIyNH0.FrhncR9kDpy1JKY-IBc0VxS8iUbTiIUejNdxIJd1MxY'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = '16026dc04e21bf12ebf7356f7e053d7d7bf53b5d5a6e21c83a18838437491405'; // вставьте сюда секретный ключ для разработки из кода
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
