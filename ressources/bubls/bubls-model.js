const db = require('../../data/dbConfig.js');
const mapper = require('../mapper.js');

module.exports = {
  getBubls,
  getBublById,
  getBublUsers,
  addBubl,
  editBubl,
  deleteBubl,
  joinBubl
};

function getBubls() {
  return db('bubls');
}

function getBublById(id) {
  return db('bubls')
    .where({id})
    .first();
}

function getBublUsers(bublId) {
  const id = parseInt(bublId);
  return db('users as u')
    .join('bubl_users_mapping as m', 'm.FK_users_id', 'u.id')
    .select('u.id', 'u.username', 'u.role')
    .where({FK_bubl_id: id});
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

function joinBubl({subject: FK_users_id}, FK_bubl_id) {
  return db('bubl_users_mapping')
    .where({FK_users_id})
    .insert({
      FK_users_id,
      FK_bubl_id
    });
}

// function joinSchool(school, user) {
//   return db('users')
//     .where({id: user.subject})
//     .update({
//       school_name: school.school_name,
//       FK_school_id: school.FK_school_id
//     });
// }
