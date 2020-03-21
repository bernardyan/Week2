exports.seed = async knex => {
    await knex('category').truncate();
    await knex('category').insert([
        { id: 1, name: 'Animation'},
        { id: 2, name: 'Sci-Fi'},
        { id: 3, name: 'Documentary'},
    ]);
};


