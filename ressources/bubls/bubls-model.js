const db = require('../../data/dbConfig.js');

module.exports = {
  getBubls,
  getBublById,
  addBubl,
  editBubl,
  deleteBubl
};

function getBubls() {
  return db('bubls');
}

function getBublById(id) {
  return db('bubls')
    .where({id})
    .first();
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
