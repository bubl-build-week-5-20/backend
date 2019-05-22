exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'Jim',
          password:
            '$2b$10$VQnNXZhslGw.Hj.Pc7QVVenelJIvjoZbRsEcWHBabLgVzUlj0CeYu',
          role: 'administrator',
          school_name: 'Stowe Middle School',
          FK_school_id: 1,
          FK_role_id: 1
        },
        {
          username: 'Bob',
          password:
            '$2b$10$vKfWwnA3HTolcZWb9lCtqemIQNpT.CAYKYbSQkX7ODeCZAlTm/6Rm',
          role: 'student',
          school_name: 'Bloomfield Middle School',
          FK_school_id: 3,
          FK_role_id: 2
        }
      ]);
    });
};
