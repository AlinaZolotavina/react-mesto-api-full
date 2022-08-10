const corsOptions = {
  origin: [
    'https://mesto.students.nomoredomains.sbs',
    'http://mesto.students.nomoredomains.sbs',
    'http://localhost:3000',
  ],
  credentials: true,
};

module.exports = corsOptions;
