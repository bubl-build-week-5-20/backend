exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'Jim',
          password:
            '$2b$10$VQnNXZhslGw.Hj.Pc7QVVenelJIvjoZbRsEcWHBabLgVzUlj0CeYu',
          role: 'administrator',
          school_name: 'Stowe Middle School',
          created_at: '2019-05-21 16:13:38',
          FK_school_id: 1,
          FK_role_id: 1
        },
        {
          id: 2,
          username: 'Bob',
          password:
            '$2b$10$vKfWwnA3HTolcZWb9lCtqemIQNpT.CAYKYbSQkX7ODeCZAlTm/6Rm',
          role: 'student',
          school_name: 'Bloomfield Middle School',
          created_at: '2019-05-21 16:20:38',
          FK_school_id: 3,
          FK_role_id: 2
        }
      ]);
    });
};
