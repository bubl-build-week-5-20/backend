const db = require('../../data/dbConfig.js');

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  addUser,
  editUser,
  deleteUser
};

function getUsers() {
  return db('users').select('id', 'username', 'role', 'school_name');
}

function getUserById(id) {
  return db('users')
    .where({id})
    .first();
}

function getUserByName(username) {
  return db('users')
    .where({username})
    .first();
}

async function addUser(user) {
  const [id] = await db('users').insert(user, 'id');
  return db('users')
    .where({id})
    .first();
}

async function editUser(id, editedUser) {
  const [id] = await db('users')
    .where('id', id)
    .update(editedUser)
    .then(count => (count > 0 ? this.get(id) : null));
}

function deleteUser(id) {
  return db('users')
    .where('id', id)
    .del();
}
