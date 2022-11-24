const bcrypt = require('bcryptjs');
const db = require('../db');
const jwt = require('jsonwebtoken');
const ConflictError = require('../errors/conflict-error')
const UnauthorizedError = require('../errors/unauthorized-error')

const createUser = (req, res, next) => {
  const { name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => db.query(
      'INSERT INTO users (name, password) VALUES ($1, $2)',
      [name, hash]
    ))
    .then((user) => res.status(201).send(`Создан новый аккаунт для ${user.rows[0].name}`))
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
    if (user.rows.length === 0) return res.status(404).send({error:'Пользователь с таким именем не существует'});

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(401).json({error: 'Неверный пароль'});

    const token = jwt.sign({ id: user.id }, 'secret');
    res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
    res.json(token);
  } catch (error) {
    res.status(401).send({error: error.message});
  }

};

module.exports = {createUser, login};
