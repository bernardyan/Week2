exports.seed = async knex => {
    await knex('categories_movies').truncate();
    await knex('categories_movies').insert([
        { category_id : 2, movie_id: 5},
    ]);
};

