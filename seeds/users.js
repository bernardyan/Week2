exports.seed = async knex => {
    await knex('users').truncate();
    await knex('users').insert([
        { id: 1, username: "byan", email: 'test@email.com', password: "testpass" },
        ]);
};