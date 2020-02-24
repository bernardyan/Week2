import knex from '../database'

export const getMovieCount = async () => (await knex('movies').count())[0].count;

export const getMovieById = async id => {

    const result = await knex('movies')
        .where({ id })
        .select('title');
    return (result[0] || {})["title"];

};

export const deleteMovie = async id => {
    await knex('movies').del().where({ id });
    await knex('movies_platforms')
        .del()
        .where({ movie_id: id });
};

// Add movie -> platform
export const addRelation = async (relation) => {
    const platform_id = relation['platform_id'];
    const movie_id = relation['movie_id'];

    console.log(platform_id);
    console.log(movie_id);
    console.log("add relation");

    const [new_id] = await knex('movies_platforms')
        .insert({ movie_id: movie_id, platform_id: platform_id})
        .returning('movie_id');

    console.log(new_id);
    return {"id": new_id};

};


export const checkAvailable = async (title) => {
    console.log("CheckAvailable, received content: " + title);

    const result = await knex('movies')
        .select('title', 'service')
        .join('movies_platforms', 'movies.id', 'movies_platforms.movie_id')
        .join('platform', 'movies_platforms.platform_id', 'platform.id')
        .where('title', title);

    console.log("CheckAvailable, result: " + result);
    return result;

};


export const updateDesc = async (content) => {
    const desc = content['desc'];
    const movie_id = content['movie_id'];

    await knex('movies')
        .update({ description:desc})
        .where({id:movie_id});
    return  { "success": true };

};


