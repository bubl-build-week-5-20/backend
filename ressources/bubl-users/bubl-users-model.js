const db = require('../../data/dbConfig.js');

module.exports = {
  getBublUsers,
  addUser,
  addBubl
};

function getBublUsers() {
  return db('bubl_users_mapping');
}

function addUser(id) {
  return db('bubl_users_mapping')
    .insert(id)
    .then(id => {
      return db('bubl_users_mapping')
        .where({FK_user_id: id})
        .first();
    });
}

function addBubl(id) {
  return db('bubl_users_mapping')
    .insert(id)
    .then(id => {
      return db('bubl_users_mapping')
        .where({FK_bubl_id: id})
        .first();
    });
}
