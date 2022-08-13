const corsOptions = {
  origin: [
    'https://mesto.students.nomoredomains.sbs',
    'http://mesto.students.nomoredomains.sbs',
    'localhost:3000',
  ],
  credentials: true,
};

module.exports = corsOptions;
