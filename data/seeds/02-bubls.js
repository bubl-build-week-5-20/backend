exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bubls')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('bubls').insert([
        {
          id: 1,
          bubl_name: 'Algebra',
          max_students_allowed: 30,
          is_active: true,
          FK_school_id: 2,
          created_at: '2019-05-21 14:58:19'
        },
        {
          id: 2,
          bubl_name: 'English',
          max_students_allowed: 80,
          is_active: true,
          FK_school_id: 1,
          created_at: '2019-05-21 15:00:01'
        }
      ]);
    });
};
