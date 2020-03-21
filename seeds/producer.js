exports.seed = async knex => {
    await knex('producer').truncate();
    await knex('producer').insert([
        { id: 1, name: 'Disney'},
        { id: 2, name: 'Netflix'},
        { id: 3, name: 'Sony'},
        { id: 4, name: 'Skydance'},
    ]);
};
