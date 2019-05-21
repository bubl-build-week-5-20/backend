exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('schools')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('schools').insert([
        {id: 1, school_name: 'Stowe Middle School'},
        {id: 2, school_name: 'Scranton Middle School'},
        {id: 3, school_name: 'Bloomfield Middle School'}
      ]);
    });
};
