import express from 'express';
import { guessRandom } from './guess.js';

const app = express();

const guessNumber = (request, response) => {
    const { num } = request.params || {};
    const result = guessRandom(num);
    response.json(result);
};
app.get('/api/:num', guessNumber);

const staticRoute = express.static('static');
app.use('/static', staticRoute);
app.use('/', staticRoute);

export default app;