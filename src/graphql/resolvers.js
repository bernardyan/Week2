import { checkAvailable, getAllProducers, getMoviesByProducer, getAllCategories, getMoviesByCategory, deleteMovie, updateDesc, addRelation } from '../services/movies.js';

const resolvers = {
    getMoviePlatform: async (content) => {
        console.log("resolvers get mov platform");
        console.log(content);

        const out = await checkAvailable(content['name']);
        console.log("resolvers get mov platform return: ");
        console.log(out);
        return out;
    },

    getAllProducers: async (content) => {
        console.log("resolvers getAllProducers");
        console.log(content);

        const out = await getAllProducers();
        console.log("resolvers getAllProducers return: ");
        console.log(out);
        return out;
    },

    getMoviesByProducer: async (content) => {

        console.log("resolvers getMoviesByProducer");
        console.log(content);

        const out = await getMoviesByProducer(content['name']);
        console.log("resolvers getMoviesByProducer return: ");
        console.log(out);
        return out;

    },


    getAllCategories: async (content) => {
        console.log("resolvers get all cate");
        console.log(content);

        const out = await getAllCategories();
        console.log("resolvers get all cate return: ");
        console.log(out);
        return out;
    },

    getMoviesByCategory: async (content) => {

        console.log("resolvers getAllMovieByCategory");
        console.log(content);

        const out = await getMoviesByCategory(content['name']);
        console.log("resolvers getAllMovieByCategory return: ");
        console.log(out);
        return out;

    }

    // updateCard: async (content) => {
    //     const id = content['update']['id'];
    //     const newName = content['update']['name'];
    //     return updateName(id, newName);
    // },

};

export default resolvers;
