exports.seed = async knex => {
    await knex('movies_platforms').truncate();
    await knex('movies_platforms').insert([
        { movie_id: 1, platform_id: 1},
        { movie_id: 2, platform_id: 1},
        { movie_id: 3, platform_id: 1},
        { movie_id: 4, platform_id: 1},
        { movie_id: 4, platform_id: 2},
        { movie_id: 5, platform_id: 2}
    ]);
};


