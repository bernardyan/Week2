exports.up = async knex => {

    await knex.schema.dropTableIfExists('producer');
    await knex.schema.createTable('producer', table => {
        table.increments();
        table.string('name', 50).notNullable().unique();
    });

    await knex.schema.dropTableIfExists('category');
    await knex.schema.createTable('category', table => {
        table.increments();
        table.string('name', 50).notNullable().unique();
    });

    await knex.schema.dropTableIfExists('producers_movies');
    await knex.schema.createTable('producers_movies', table => {
        table.integer('producer_id')
        table.foreign('producer').references('id');
        table.integer('movie_id');
        table.foreign('movies').references('id');
        table.primary(['producer_id', 'movie_id']);
    });

    await knex.schema.dropTableIfExists('categories_movies');
    await knex.schema.createTable('categories_movies', table => {
        table.integer('category_id')
        table.foreign('category').references('id');
        table.integer('movie_id');
        table.foreign('movies').references('id');
        table.primary(['category_id', 'movie_id']);
    });
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('producer');
    await knex.schema.createTable('producer', table => {
        table.increments();
        table.string('name', 50).notNullable().unique();
    });

    await knex.schema.dropTableIfExists('category');
    await knex.schema.createTable('category', table => {
        table.increments();
        table.string('name', 50).notNullable().unique();
    });

    await knex.schema.dropTableIfExists('producers_movies');
    await knex.schema.createTable('producers_movies', table => {
        table.integer('producer_id')
        table.foreign('producer').references('id');
        table.integer('movie_id');
        table.foreign('movies').references('id');
        table.primary(['producer_id', 'movie_id']);
    });

    await knex.schema.dropTableIfExists('categories_movies');
    await knex.schema.createTable('categories_movies', table => {
        table.integer('category_id')
        table.foreign('category').references('id');
        table.integer('movie_id');
        table.foreign('movies').references('id');
        table.primary(['category_id', 'movie_id']);
    });
};
