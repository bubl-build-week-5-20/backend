const db = require('../../data/dbConfig.js');
const mapper = require('../mapper.js');

module.exports = {
  getSchools,
  getBubls,
  getShoolById,
  getSchoolsBubls,
  getSchoolsUsers,
  addSchool,
  editSchool,
  deleteSchool,
  joinSchool
};

function getSchools() {
  return db('schools');
}

function getBubls() {
  return db('schools as s')
    .join('bubls as b', 'b.id', 'b.bubl_name', 's.id')
    .select('b.id', 'b.bubl_name', 'b.FK_school_id', 's.id', 's.school_name')
    .where({'s.id': 'b.FK_school_id'});
}

function getShoolById(schoolId) {
  const id = parseInt(schoolId);
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
    .where({'schools.id': id, FK_school_id: 'schools.id'})
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
      'users.FK_school_id'
    )
    .where('users.FK_school_id', id)
    .then(users => users.map(user => mapper.userToBody(user)));
}

// function getSchoolsUsers(schoolId) {
//   const id = parseInt(schoolId);
//   return db('users as u')
//     .join('schools as s', 's.id', 'u.FK_school_id')
//     .select('s.id', 's.school_name')
//     .where({id});
// }

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

function joinSchool(school, user) {
  return db('users')
    .where({id: user.subject})
    .update({
      school_name: school.school_name,
      FK_school_id: school.FK_school_id
    });
}
