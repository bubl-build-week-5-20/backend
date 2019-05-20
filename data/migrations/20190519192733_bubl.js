exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('schools', tbl => {
      tbl.increments();
      tbl.string('school_name', 200);
    })
    .createTable('bubls', tbl => {
      tbl.increments();
      tbl
        .string('bubl_name', 200)
        .notNullable()
        .unique();
      tbl.integer('max_students_allowed').notNullable();
      tbl.boolean('is_active').defaultTo(true);
      tbl
        .integer('FK_school_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('schools')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('users', tbl => {
      tbl.increments();
      tbl
        .string('username', 128)
        .notNullable()
        .unique();
      tbl.string('password', 255).notNullable();
      tbl.string('role', 128).defaultTo('student');
      tbl.string('school_name', 128);
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('bubl_users_mapping', tbl => {
      tbl.increments();
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
      tbl
        .integer('FK_bubl_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('bubls')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

      tbl
        .integer('FK_users_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('posts', tbl => {
      tbl.increments();
      tbl
        .string('title', 128)
        .unique()
        .notNullable();
      tbl.string('body').notNullable();
      tbl.string('author', 128);
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
      tbl
        .integer('FK_user_id')
        .unsigned()
        .defaultTo('1')
        .references('id')
        .inTable('posts')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('comments', tbl => {
      tbl.increments();
      tbl.string('body').notNullable();
      tbl.string('author', 128).notNullable();
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
      tbl
        .integer('FK_user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      tbl
        .integer('FK_post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('hashtags', tbl => {
      tbl.increments();
      tbl
        .string('hashtag_name')
        .unique()
        .notNullable();
    })
    .createTable('post_hashtags_mapping', tbl => {
      tbl.increments();
      tbl
        .integer('FK_post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      tbl
        .integer('FK_hashtags_id')
        .unsigned()
        .notNullable()
        .references()
        .inTable('hashtags')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('comment_hashtags_mapping', tbl => {
      tbl.increments();
      tbl
        .integer('FK_comment_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('comments')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('comments_hashtags_mapping')
    .dropTableIfExists('post_hashtags_mapping')
    .dropTableIfExists('hashtags')
    .dropTableIfExists('comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('bubl_users_mapping')
    .dropTableIfExists('users')
    .dropTableIfExists('bubls')
    .dropTableIfExists('schools');
};
