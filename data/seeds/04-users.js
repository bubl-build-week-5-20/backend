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
            '$2b$10$VQnNXZhslGw.Hj.Pc7QVVenelJIvjoZbRsEcWHBabLgVzUlj0CeYu'
        },
        {
          username: 'Bob',
          password:
            '$2b$10$vKfWwnA3HTolcZWb9lCtqemIQNpT.CAYKYbSQkX7ODeCZAlTm/6Rm'
        },
        {
          username: 'Guillaume',
          password:
            '$2b$10$vKfWwnA3HTolcZWb9lCtqemIQNpT.CAYKYbSQkX7ODeCZAlTm/6Rm'
        }
      ]);
    });
};
