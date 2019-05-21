const db = require('../../data/dbConfig.js');

module.exports = {
  getSchools,
  getShoolById,
  getSchoolsBubls,
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
    .where('bubls.FK_school_id', id);
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
