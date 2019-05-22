exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('comments').insert([
        {
          body:
            'What if you have to move the decimal places twice and the number is 5.67?',
          author: 'Bob',
          FK_user_id: 2,
          FK_post_id: 1
        },
        {
          body:
            'Did you mean converting from decimals to percents, or from percents to decimals? 5.67 = 567% But, 5.67% = 0.0567',
          author: 'Jim',
          FK_user_id: 1,
          FK_post_id: 1
        }
      ]);
    });
};
