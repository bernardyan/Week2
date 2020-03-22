import express from 'express';
import session from 'express-session'
import ConnectSessionKnex from 'connect-session-knex'
import knex from './database'

import graphqlHTTP from 'express-graphql'
import resolvers from './graphql/resolvers'
import schema from './graphql/schema'


//
//
// const app = express();
// app.use(express.json());
//
// const KnexSessionStore = ConnectSessionKnex(session);
// const store = new KnexSessionStore({ knex });
// const ONE_MONTH = 7 * 24 * 60 * 60 * 1000;
// const sessionMiddleware = session({
//     store: new KnexSessionStore({ knex }),
//     secret: 'scretString',
//     cookie: { maxAge: ONE_MONTH }
// });
// //
// app.use(sessionMiddleware);
// const login = async (request, response) => {
//     console.log(request.body);
//     const username = request.body['username'];
//     const password = request.body['password'];
//
//     const user = await getUserByUsername(username);
//     console.log(user.password);
//
//     const matches = await compareHashed(password, user.password);
//     request.session.user = matches ? user : null;
//
//     console.log(request.session);
//     response.send(request.session.user);
//
// };
// app.post('/api/login', login);
// //
// const current = async (request, response) => {
//     // console.log(response);
//     console.log(request.session.user);
//     // return request.session.user;
//     if (request.session.user === undefined) {
//         response.send({});
//     } else {
//         response.send(request.session.user);
//     }
//
// };
// app.get('/api/currentUser', current);
// //
// const create_user = async (request, response) => {
//     console.log(request.body);
//     const username = request.body['username'];
//     const email = request.body['email'];
//     const password = request.body['password'];
//     request.session.user = await createUser({username, email, password});
//
//
//     console.log(request.session);
//     response.send(request.session.user);
//
// };
// app.post('/api/user', create_user);





const app = express();
app.use(express.json());

const ONE_MONTH = 7 * 24 * 60 * 60 * 1000;
const KnexSessionStore = ConnectSessionKnex(session);
app.use(session({
    store: new KnexSessionStore({ knex }),
    secret: 'where2watch',
    cookie: { maxAge: ONE_MONTH }
}));

app.use('/api/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
}));


const staticRoute = express.static('static');
app.use('/static', staticRoute);
app.use('/', staticRoute);

export default app;