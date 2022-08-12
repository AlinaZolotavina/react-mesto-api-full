const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({ message: 'Вход выполнен' });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  const { email } = req.body;
  const token = req.cookies.jwt;

  if (!token) {
    return new UnauthorizedError('Что-то не так с токеном');
  }

  let verifiedUser;

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', (err, decoded) => {
        if (err) {
          return next(new UnauthorizedError('Необходима авторизация'));
        }
        verifiedUser = decoded;
        if (user._id.toHexString() !== verifiedUser._id) {
          return next(new UnauthorizedError('Необходима авторизация'));
        }
        return res
          .clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          })
          .send({ message: 'Вы вышли' });
      });
      return true;
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.status(201).send({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' || err.code === 11000) {
        return next(new ConflictError('Пользователь с таким e-mail уже существует'));
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError('Введенные данные некорректны'));
      }
      return next(err);
    });
};

const updateUserProfile = ((req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(200).send(user);
    })
    .catch(next);
});

const updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  login,
  logout,
  getUsers,
  getUserById,
  getMe,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
