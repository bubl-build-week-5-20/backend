exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'John',
          password:
            '$2b$10$HFT6p9V8.c4m5Fhfp8K3zuDSIcLlNXPuQy95ILmorw6./cV2UvZYy'
        }
      ]);
    });
};
