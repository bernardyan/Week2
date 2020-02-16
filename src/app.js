import express from 'express';
import { getMovieCount, deleteMovie, addRelation, updateDesc, checkAvailable }
    from './services/movies';

const app = express();

const deleteMov = (request, response) => {
    const { id } = request.params || {};
    const result = deleteMovie(id);
    response.json(result);
};
app.get('/api/delete/:id', deleteMov);

const movieCount = async (request, response) => {

    const count = await getMovieCount();
    response.json({"count":count});
};
app.get('/api/count/', movieCount);

app.use(express.json());
const addPlatform = async (request, response) => {
    console.log(request.body);

    const relation = request.body;
    relation.created_on = new Date();
    const record = await addRelation(relation);
    console.log(record);
    response.json(record);
};
app.post('/api/addRelation', addPlatform);

app.use(express.json());
const update = async (request, response) => {
    console.log("At app.js" + request.body);

    const content = request.body;
    content.created_on = new Date();
    await updateDesc(content);
    response.json({ success: true });
};
app.post('/api/updateDesc', update);

app.use(express.json());
const movieAvailable = async (request, response) => {
    console.log(request.body);

    const content = request.body;
    const result = await checkAvailable(content);
    console.log(result);
    response.json(result);
};
app.post('/api/movieAvailable', movieAvailable);


const staticRoute = express.static('static');
app.use('/static', staticRoute);
app.use('/', staticRoute);

export default app;