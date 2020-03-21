exports.seed = async knex => {
    await knex('platform').truncate();
    await knex('platform').insert([
        { id: 1, service: 'Disney+'},
        { id: 2, service: 'Netflix'},
        { id: 3, service: 'Apple TV+'},
        { id: 4, service: 'Hulu'},
    ]);
};


