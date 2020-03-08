import knex from '../database'
import { hashPassword } from '../auth'

export const getUserByUsername = async username =>
    (await knex('users').select().where({ username }))[0];


export const createUser = async ({ username, email, password }) => {
    const [user] = await knex('users').insert({
        username,
        email,
        password: await hashPassword(password)
    }).returning(['id', 'email', 'username', 'password']);

    console.log(user);
    return user;
};
