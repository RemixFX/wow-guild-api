const bcrypt = require('bcryptjs');
const db = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const ConflictError = require('../errors/conflict-error')
const UnauthorizedError = require('../errors/unauthorized-error')
const NotFoundError = require('../errors/not-found-error')

const createUser = (req, res, next) => {
  const { name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => db.query(
      'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING name',
      [name, hash]
    ))
    .then((user) => res.status(201).send({message: `Создан новый аккаунт для ${user.rows[0].name}`}))
    .catch((err) => {
      if (err.code === '23505') {
        next(new ConflictError('Пользователь с таким именем уже существует'));
      } else {
        next(err);
      }
    });
};

const login = async (req, res, next) => {
  try {
    console.log(req.cookies, req.get('origin'));
    const { name, password } = req.body;
    const user = await db.query('SELECT * FROM users WHERE name = $1', [name]);
    if (user.rows.length === 0) return next(new NotFoundError('Пользователь с таким именем не существует'));

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return next(new UnauthorizedError('Неверный пароль'));

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
    res.json(token);
  } catch (error) {
    next(error);
  }

};

module.exports = {createUser, login};
