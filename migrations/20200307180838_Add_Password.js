exports.up = async knex => {
    await knex.schema.alterTable('users', users => {
        users.string('email', 320);
        users.string('password', 60);
    });
};

exports.down = async knex => {
    await knex.schema.alterTable('users', users => {
        users.dropColumn('email');
        users.dropColumn('password');
    });
};
