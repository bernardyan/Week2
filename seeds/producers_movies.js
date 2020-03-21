exports.seed = async knex => {
    await knex('producers_movies').truncate();
    await knex('producers_movies').insert([
        { producer_id : 4, movie_id: 5},
    ]);
};
