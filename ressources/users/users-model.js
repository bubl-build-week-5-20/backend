const db = require('../../data/dbConfig.js');
const mapper = require('../mapper.js');

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  addUser,
  editUser,
  deleteUser,
  getUserBubls
};

function getUsers() {
  return db('users').select('id', 'username', 'role', 'school_name');
}

function getUserById(id) {
  return db('users as u')
    .select(
      'u.username',
      'u.role',
      'u.school_name',
      'u.created_at',
      'FK_school_id',
      'FK_role_id'
    )
    .where({id})
    .first();
}

function getUserByName(username) {
  return db('users')
    .where({username})
    .first();
}

function getUserBubls(id) {
  return db('bubl_users_mapping')
    .where('bubl_users_mapping.FK_users_id', id)
    .then(bubls => bubls.map(bubl => mapper.bublToBody(bubl)));
}

async function addUser(user) {
  const [id] = await db('users').insert(user, 'id');
  return db('users')
    .where({id})
    .first();
}

function editUser(id, editedUser) {
  return db('users')
    .where({id})
    .update(editedUser)
    .then(count => (count > 0 ? this.get(id) : null));
}

function deleteUser(id) {
  return db('users')
    .where('id', id)
    .del();
}
