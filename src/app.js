import express from 'express';
import session from 'express-session'
import ConnectSessionKnex from 'connect-session-knex'
import knex from './database'

import { getMovieCount, deleteMovie, addRelation, updateDesc, checkAvailable }
    from './services/movies';

import { getUserByUsername, createUser }
    from './services/users';
import { compareHashed } from './auth'


const app = express();
app.use(express.json());

const KnexSessionStore = ConnectSessionKnex(session);
const store = new KnexSessionStore({ knex });
const ONE_MONTH = 7 * 24 * 60 * 60 * 1000;
const sessionMiddleware = session({
    store: new KnexSessionStore({ knex }),
    secret: 'scretString',
    cookie: { maxAge: ONE_MONTH }
});

app.use(sessionMiddleware);
const login = async (request, response) => {
    console.log(request.body);
    console.log(response.body);
    const username = request.body['username'];
    const password = request.body['password'];

    const user = await getUserByUsername(username);
    const matches = await compareHashed(password, user.password);
    request.session.user = matches ? user : null;

    console.log(request.session);
    return request.session.user;

};
app.post('/api/login', login);

const current = async (request, response) => {
    console.log(request.session);

};
app.get('/api/currentUser', current);

const create_user = async (request, response) => {
    console.log(request.body);
    const username = request.body['username'];
    const email = request.body['email'];
    const password = request.body['password'];
    request.session.user = await createUser({username, email, password});


    console.log(request.session);
    return request.session.user;

};
app.post('/api/user', create_user);


const deleteMov = (request, response) => {
    const { id } = request.params || {};
    deleteMovie(id);
    response.json({ success: true }); // Updated per jeremy's comment
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
    console.log("movieAvailable, body: " + request.body);

    const content = request.body;
    const result = await checkAvailable(content['title']);
    // console.log(result);
    response.json(result); // Result array of object as format [{'title': 'platform'}, {'title': 'platform'}]
};
app.post('/api/movieAvailable', movieAvailable);


const staticRoute = express.static('static');
app.use('/static', staticRoute);
app.use('/', staticRoute);

export default app;