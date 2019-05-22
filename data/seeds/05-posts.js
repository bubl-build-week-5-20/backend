exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          title: 'Converting percents to decimals: 59.2%',
          body:
            'Decimals can be written in percent form. ​Per-cent means per-100. So, we multiply the decimal by 100 to get an equivalent percent. Then, we add a percent sign (%). For example, 0.8 can be converted to percent form by solving 0.8✕100. So, 0.8=80%.',
          author: 'Jim',
          created_at: '2019-05-21 16:03:19',
          FK_user_id: 1
        }
      ]);
    });
};
