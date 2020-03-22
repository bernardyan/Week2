import {
    checkAvailable,
    getAllProducers,
    getMoviesByProducer,
    getAllCategories,
    getMoviesByCategory,
    deleteMovie,
    updateDesc,
    addRelation,
    addCategory
} from '../services/movies.js';

import {
    getUserByUsername,
    createUser
} from '../services/users'

import { compareHashed } from '../auth.js'


const resolvers = {
    getMoviePlatform: async (content) => {
        return await checkAvailable(content['name']);
    },

    getAllProducers: async (content) => {
        return await getAllProducers();
    },

    getMoviesByProducer: async (content) => {
        return await getMoviesByProducer(content['name']);
    },

    getAllCategories: async (content) => {
        return await getAllCategories();
    },

    getMoviesByCategory: async (content) => {
        return await getMoviesByCategory(content['name']);
    },

    deleteMovie: async (content) => {
        // console.log("delete resolver");
        const id = content['id'];
        return deleteMovie(id)
    },

    updateMovie: async (content) => {
        const id = content['update']['id'];
        const description = content['update']['description'];
        return updateDesc({desc: description, movie_id: id});
    },

    addRelation: async (content) => {
        // console.log("add relation resovler");
        // console.log(content);
        const platform_id = content['update']['platform'];
        const mov_id = content['update']['movie'];
        return addRelation({platform_id: platform_id, movie_id: mov_id});
    },

    addCategory: async (content) => {
        const category_id = content['update']['category'];
        const mov_id = content['update']['movie'];
        return addCategory({category_id: category_id, movie_id: mov_id});
    },

    currentUser: (args, { session }) => {

        console.log("res current user");
        console.log(session)
        console.log(session.user);
        return session.user;
    },

    signup: async (args, { session }) => {

        const username = args['user']['username'];
        const email = args['user']['email'];
        const password = args['user']['password'];

        const createdUser = await createUser({username: username, email: email, password: password});
        session.user = createdUser;
        console.log(createdUser);

        return createdUser;

    },

    login: async (args, { session }) => {

        console.log("login res");

        const username = args['user']['username'];
        const email = args['user']['email'];
        const password = args['user']['password'];

        const user = await getUserByUsername(username);
        // session.user = createdUser;
        // console.log(createdUser);


        const matches = await compareHashed(password, user.password);
        session.user = matches ? user : null;

        return {id: user.id, username: user.username};




    }

};

export default resolvers;
