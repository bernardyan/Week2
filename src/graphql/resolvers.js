import {
    checkAvailable
} from '../services/movies.js';

const resolvers = {
    getMoviePlatform: async (content) => {
        console.log("resolvers get mov platform");
        console.log(content);

        const out = await checkAvailable(content['name']);
        console.log("resolvers get mov platform return: ");
        console.log(out);
        return out;
    },

    // updateCard: async (content) => {
    //     const id = content['update']['id'];
    //     const newName = content['update']['name'];
    //     return updateName(id, newName);
    // },

};

export default resolvers;
