const db = require('../../data/dbConfig.js');

module.exports = {
  getSchools,
  getShoolById,
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
