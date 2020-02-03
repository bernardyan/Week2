import express from 'express';


const app = express();

const staticRoute = express.static('static');
app.use('/static', staticRoute);
app.use('/', staticRoute);



export default app;