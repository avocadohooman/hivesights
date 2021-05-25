import express from 'express';
import cors from 'cors';
import middleware from './utils/middleware';

const app = express();

// for cross communication between client <> server
app.use(cors());

//protecting from DOS Attack 
app.use(express.json({limit: '20kb'}));

// when client is ready, activate this line
if (process.env.NODE_ENV !== "server") {
    app.use(express.static('build'));
}

// this middleware needs to be used before routes are defined
app.use(middleware.requestLogger);

// health check for Heroku deployment
app.get('/health', async (req, res) => {
    res.send('ok');
})

// this needs to be after the routes are defined
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;