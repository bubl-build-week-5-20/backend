exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('schools')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('schools').insert([
        {school_name: 'Stowe Middle School'},
        {school_name: 'Scranton Middle School'},
        {school_name: 'Bloomfield Middle School'}
      ]);
    });
};
