import express from 'express';
// import { guessRandom } from './guess.js';

import { getMovieCount, deleteMovie, addRelation, updateDesc }
    from './services/movies';

const app = express();



const deleteMov = (request, response) => {

    // console.log(`guess num, app.js`);
    const { id } = request.params || {};
    const result = deleteMovie(id);
    response.json(result);
};
app.get('/api/delete/:id', deleteMov);

const movieCount = async (request, response) => {
    console.log(`app.js`);

    const count = await getMovieCount();
    response.json({"count":count});
};
app.get('/api/count/', movieCount);

app.use(express.json());
const addPlatform = async (request, response) => {
    console.log(request.body);

    const relation = request.body;
    relation.created_on = new Date();
    await addRelation(relation);
    response.json({ success: true });
};
app.post('/api/addRelation', addPlatform);

app.use(express.json());
const update = async (request, response) => {
    console.log(request.body);

    const content = request.body;
    content.created_on = new Date();
    await updateDesc(content);
    response.json({ success: true });
};
app.post('/api/updateDesc', update);




const staticRoute = express.static('static');
app.use('/static', staticRoute);
app.use('/', staticRoute);

export default app;