const db = require('../../data/dbConfig.js');
const mapper = require('../mapper.js');

module.exports = {
  getRoles,
  getRoleById,
  getRoleUsers,
  addRole,
  editRole,
  deleteRole
};

function getRoles() {
  return db('roles');
}

function getRoleById(id) {
  return db('roles')
    .where({id})
    .first();
}

function getRoleUsers(id) {
  return db('users')
    .select('users.id', 'users.username', 'users.school_name')
    .where('users.FK_role_id', id)
    .then(users => users.map(user => mapper.roleToBody(user)));
}

async function addRole(role) {
  const [id] = await db('roles').insert(role);
  return getRoleById(id);
}

function editRole(id, role) {
  return db('roles')
    .where('id', id)
    .update(role);
}

function deleteRole(id) {
  return db('roles')
    .where('id', id)
    .del();
}
