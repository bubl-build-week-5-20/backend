exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bubl_users_mapping')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('bubl_users_mapping').insert([
        {FK_bubl_id: 2, FK_users_id: 1}
      ]);
    });
};
