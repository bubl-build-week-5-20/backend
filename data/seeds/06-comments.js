exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('comments').insert([
        {
          id: 1,
          body:
            'What if you have to move the decimal places twice and the number is 5.67?',
          author: 'Bob',
          created_at: '2019-05-21 23:12:19',
          FK_user_id: 2,
          FK_post_id: 1
        },
        {
          id: 2,
          body:
            'Did you mean converting from decimals to percents, or from percents to decimals? 5.67 = 567% But, 5.67% = 0.0567',
          author: 'Jim',
          created_at: '2019-05-21 23:18:19',
          FK_user_id: 1,
          FK_post_id: 1
        }
      ]);
    });
};
