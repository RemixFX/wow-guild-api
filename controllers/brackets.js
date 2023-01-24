const db = require('../db');

const postBracket = async (req, res, next) => {
  try {
    for (const player of req.body) {

      const { id, role, name, class_name, race, ilvl, note, group_name, raid_id } = player;
      console.log(player)
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


module.exports = { postBracket, getBrackets }
