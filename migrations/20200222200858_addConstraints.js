// Well.. looks like I was one step ahead and defined contraint in my initial db setup
// But... let's say if I didn't

exports.up = async knex => {

    await knex.schema.dropTableIfExists('users');
    await knex.schema.createTable('users', table => {
        table.increments();
        table.string('username', 25).unique().notNullable();
        ['created_on', 'last_login'].forEach(column =>
            table.timestamp(column).defaultTo(knex.fn.now())
                .notNullable());
    });
    await knex.schema.dropTableIfExists('movies');
    await knex.schema.createTable('movies', table => {
        table.increments();
        table.string('title', 100).notNullable();
        table.text('description').notNullable();
        table.integer('created_by').notNullable();
        table.timestamp('created_on').defaultTo(knex.fn.now()).notNullable();
    });

    await knex.schema.dropTableIfExists('platform');
    await knex.schema.createTable('platform', table => {
        table.increments();
        table.string('service', 50).notNullable().unique();
    });

    await knex.schema.dropTableIfExists('movies_platforms');
    await knex.schema.createTable('movies_platforms', table => {
        table.integer('movie_id');
        table.foreign('movies').references('id');
        table.integer('platform_id')
        table.foreign('platform').references('id');
        table.primary(['movie_id', 'platform_id']);
    });
};

exports.down = async knex => {

    await knex.schema.dropTableIfExists('users');
    await knex.schema.createTable('users', table => {
        table.specificType('id', 'serial');
        table.string('username', 25);
        ['created_on', 'last_login'].forEach(column =>
            table.timestamp(column)
        );
    });

    await knex.schema.dropTableIfExists('movies');
    await knex.schema.createTable('movies', table => {
        table.specificType('id', 'serial');
        table.string('title', 100);
        table.text('description');
        table.integer('created_by');
        table.timestamp('created_on');
    });

    await knex.schema.dropTableIfExists('platform');
    await knex.schema.createTable('platform', table => {
        table.specificType('id', 'serial');
        table.string('service', 50);
    });


    await knex.schema.dropTableIfExists('movies_platforms');
    await knex.schema.createTable('movies_platforms', table => {
        table.integer('movie_id');
        table.integer('platform_id');
    });
  
};


