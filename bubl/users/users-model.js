const db = require('../data/dbConfig.js');

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  addUser
  // editUser,
  // deleteUser
};

function getUsers() {
  return db('users').select(
    'id',
    'username',
    'role',
    'school_name',
    'created_at',
    'FK_school_id'
  );
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
