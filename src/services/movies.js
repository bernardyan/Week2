import knex from '../database'

// -----QUERY-----

// Get streaming services by mov title
export const checkAvailable = async (title) => {
    console.log("CheckAvailable, received content: " + title);

    const result = await knex('movies')
        .select('title', 'service')
        .join('movies_platforms', 'movies.id', 'movies_platforms.movie_id')
        .join('platform', 'movies_platforms.platform_id', 'platform.id')
        .where('title', title);

    console.log("CheckAvailable, result: ");
    console.log(result);
    return result;

};


// Get all production companies
export const getAllProducers = async () => {

  const result = await knex("producer")
      .select('name');

  console.log(result);

  return result;

};


// Get all movies by X production company
export const getMoviesByProducer = async (company) => {

    console.log("getMoviesByProducer, received content: " + company);

    const result = await knex('movies')
        .select('movies.title')
        .join('producers_movies', 'movies.id', 'producers_movies.movie_id')
        .join('producer', 'producers_movies.producer_id', 'producer.id')
        .where('name', company);

    console.log("getMoviesByProducer, result: ");
    console.log(result);
    return result;


};

// Get all mov categories
export const getAllCategories = async () => {

    const result = await knex("category")
        .select('name');

    console.log(result);

    return result;

};


// Get all movies by passing in category name
export const getMoviesByCategory = async (category) => {

    console.log("getMoviesByCategory, received content: " + category);

    const result = await knex('movies')
        .select('movies.title')
        .join('categories_movies', 'movies.id', 'categories_movies.movie_id')
        .join('category', 'categories_movies.category_id', 'category.id')
        .where('name', category);

    console.log("getMoviesByCategory, result: ");
    console.log(result);
    return result;


};

// -----MUTATION-----

// Delete mov by providing ID in DB
export const deleteMovie = async id => {
    await knex('movies').del().where({ id });
    await knex('movies_platforms')
        .del()
        .where({ movie_id: id });
};


// Update description field in a mov using mov ID in DB
export const updateDesc = async (content) => {
    const desc = content['desc'];
    const movie_id = content['movie_id'];

    await knex('movies')
        .update({ description:desc})
        .where({id:movie_id});
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


// Add a new category to a movie
export const addCategory = async (content) => {
    const category_id = content['category_id'];
    const movie_id = content['movie_id'];

    console.log(category_id);
    console.log(movie_id);
    console.log("add category");

    const [new_id] = await knex('categories_movies')
        .insert({ movie_id: movie_id, category_id: category_id})
        .returning('movie_id');

    console.log(new_id);
    return {"id": new_id};

};







