const db = require('../../data/dbConfig.js');
const mapper = require('../mapper.js');

module.exports = {
  getBubls,
  getBublById,
  getBublUsers,
  addBubl,
  editBubl,
  deleteBubl
};

function getBubls() {
  return db('bubls');
}

function getBublById(id) {
  return db('bubls')
    .where({id})
    .first();
}

function getBublUsers(id) {
  return db('bubl_users_mapping')
    .join('users', 'users.id', 'bubl_users_mapping.FK_users_id')
    .select('users.id')
    .where({'bubl_users_mapping.FK_users_id': id})
    .then(users => users.map(user => mapper.userToBody(user)));
}

async function addBubl(bubl) {
  const [id] = await db('bubls').insert(bubl, 'id');
  return getBublById(id);
}

function editBubl(id, bubl) {
  return db('bubls')
    .where('id', id)
    .update(bubl)
    .then(count => (count > 0 ? this.getBublById(id) : null));
}

function deleteBubl(id) {
  return db('bubls')
    .where('id', id)
    .del();
}
