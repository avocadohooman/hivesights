import express from 'express';
import cors from 'cors';
import middleware from './middleware/middleware';
import authRouter from './controllers/authRoute';
import companyRouter from './controllers/companyRoute';
import reviewRouter from './controllers/reviewRoute';
import kpiRouter from './controllers/kpiRoute';

const app = express();

// for cross communication between client <> server
app.use(cors());

//protecting from DOS Attack 
// app.use(express.json({limit: '20kb'}));

app.use(express.json());


// when client is ready, activate this line
if (process.env.NODE_ENV !== "server") {
    app.use(express.static('build'));
}

// this middleware needs to be used before routes are defined
app.use(middleware.requestLogger);

// health check for Heroku deployment
app.get('/health', (_req, res) => {
    res.send('ok');
});

if (process.env.NODE_ENV !== "server" && process.env.NODE_ENV !== "test") {
    app.use(middleware.tokenExtractor);
}

// API Router for 42 Authentication
app.use('/api/auth', authRouter);
// API Router for companies
app.use('/api/company', companyRouter);
// API Router for reviews
app.use('/api/reviews', reviewRouter);
// API Router for kpis
app.use('/api/kpi', kpiRouter);

// this needs to be after the routes are defined
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
