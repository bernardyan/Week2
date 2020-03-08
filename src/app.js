import express from 'express';
import session from 'express-session'
import ConnectSessionKnex from 'connect-session-knex'
import knex from './database'

import { getMovieCount, deleteMovie, addRelation, updateDesc, checkAvailable }
    from './services/movies';

import { getUserByUsername, createUser }
    from './services/users';
import { compareHashed } from './auth'

const env = process.env.NODE_ENV || 'development';

const app = express();
// app.use(express.json());

// if (!['development', 'test'].includes(env)) {
//     app.use(function (err, req, res, next) {
//         console.error(err);
//         res.status(500).send();
//     });
// }

const ONE_MONTH = 7 * 24 * 60 * 60 * 1000;
const KnexSessionStore = ConnectSessionKnex(session);
const store = new KnexSessionStore({ knex });
const sessionMiddleWare = session({
    store, cookie: {maxAge: ONE_MONTH},
    secret: "secret"
});
app.use(sessionMiddleWare);


app.use(express.json());
const login = async (request, response) => {
    console.log(request.body);
    const username = request.body['username'];
    const password = request.body['password'];

    const user = await getUserByUsername(username);
    const matches = await compareHashed(password, user.password);
    session.user = matches ? user : null;
    return session.user;

};
app.get('/api/user', login);

const create_user = async (request, response) => {
    console.log(request.body);
    const username = request.body['username'];
    const email = request.body['email'];
    const password = request.body['password'];
    session.user = await createUser({username, email, password});

    console.log(session);
    return session.user;

};
app.post('/api/user', create_user);


// app.post('/api/currentUser', (args, { session }) => {
//     console.log(session);
//     return session.user;
// });


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