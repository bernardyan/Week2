import knex from '../database'

export const getMovieCount = async () => (await knex('movies').count())[0].count;

export const deleteMovie = async id => {
    await knex('movies').delete().where({ id });

    await knex('movies_platforms')
        .delete()
        .where({ movie_id: id });
    return  { "success": true };

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


export const checkAvailable = async (content) => {

    console.log(content);
    const title = content['title'];

    const [id] = await knex('movies')
        .select("id")
        .where("title", title);

    console.log(id);
    return  { "success": true, "id": id };

};

export const updateDesc = async (content) => {
    const desc = content['desc'];
    const movie_id = content['movie_id'];

    await knex('movies')
        .update({ description:desc})
        .where({id:movie_id});
    return  { "success": true };

};


