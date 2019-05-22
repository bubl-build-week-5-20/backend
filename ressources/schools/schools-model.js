const db = require('../../data/dbConfig.js');
const mapper = require('../mapper.js');

module.exports = {
  getSchools,
  getShoolById,
  getSchoolsBubls,
  getSchoolsUsers,
  addSchool,
  editSchool,
  deleteSchool
};

function getSchools() {
  return db('schools');
}

function getShoolById(id) {
  return db('schools')
    .where({id})
    .first();
}

function getSchoolsBubls(id) {
  return db('bubls')
    .join('schools', 'schools.id', 'bubls.FK_school_id')
    .select(
      'bubls.id',
      'bubls.bubl_name',
      'bubls.max_students_allowed',
      'bubls.is_active',
      'bubls.created_at'
    )
    .where('bubls.FK_school_id', id)
    .then(bubls => bubls.map(bubl => mapper.bublToBody(bubl)));
}

function getSchoolsUsers(id) {
  return db('users')
    .join('schools', 'schools.id', 'users.FK_school_id')
    .select(
      'users.id',
      'users.username',
      'users.role',
      'users.school_name',
      'users.created_at',
      'FK_school_id'
    )
    .where('users.FK_school_id', id)
    .then(users => users.map(user => mapper.userToBody(user)));
}

async function addSchool(school) {
  const [id] = await db('schools').insert(school, 'id');
  return db('schools')
    .where({id})
    .first();
}

function editSchool(id, school) {
  return db('schools')
    .where('id', id)
    .update(school)
    .then(count => (count > 0 ? this.getShoolById(id) : null));
}

function deleteSchool(id) {
  return db('schools')
    .where('id', id)
    .del();
}
