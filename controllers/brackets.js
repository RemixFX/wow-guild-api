const db = require('../db');

const postBracket = async (req, res, next) => {
  try {
    for (const player of req.body) {
      const { id, role, name, class_name, race, ilvl, note, group_name, raid_id } = player;
      await db.query(
        `INSERT INTO brackets (id, role, name, class_name, race, ilvl, note, group_name, raid_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [id, role, name, class_name, race, ilvl, note, group_name, raid_id])
    }
    res.status(201).send({ message: 'Рейд сохранён' });
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const getBrackets = (req, res, next) => {
  db.query(
    'SELECT * FROM brackets ORDER BY bd_id')
    .then((brackets) => res.status(200).json(brackets.rows))
    .catch((err) => next(err))
};

const deleteBracket = (req, res, next) => {
  const reqId = parseInt(req.params.id);
  db.query(
    'DELETE FROM brackets WHERE raid_id = $1',
    [reqId])
    .then(() => res.status(200).json(String(reqId)))
    .catch((err) => {
      console.log(err)
      next(err)
    })
}

const updateNote = (req, res, next) => {
  const { note, playerID, raidID } = req.body;
  db.query(
    'UPDATE brackets SET note = $1 WHERE id = $2 AND raid_id = $3 RETURNING raid_id, id, note, group_name',
    [note, playerID, raidID])
    .then((result) => res.status(200).json(result.rows[0]))
    .catch((err) => {
      console.log(err)
      next(err)
    })
}


module.exports = { postBracket, getBrackets, deleteBracket, updateNote }
