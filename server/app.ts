import express from 'express';
import cors from 'cors';
import middleware from './middleware/middleware';
import authRouter from './controllers/authRoute';
import companyRouter from './controllers/companyRoute';
import reviewRouter from './controllers/reviewRoute';
import kpiRouter from './controllers/kpiRoute';
import path from 'path';

const app = express();

// for cross communication between client <> server
app.use(cors());

//protecting from DOS Attack 
app.use(express.json({limit: '10kb'}));


// when client is in production, activate this line
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./build'));
}

// this middleware needs to be used before routes are defined
app.use(middleware.requestLogger);

// health check for Heroku deployment
app.get('/health', (_req, res) => {
    res.send('ok');
});

// API Router for 42 Authentication
app.use('/api/auth', authRouter);

// Extracting token for company, rewview and kpi route
if (process.env.NODE_ENV !== "test") {
    app.use(middleware.tokenExtractor);
}

// API Router for companies
app.use('/api/company', companyRouter);


// API Router for reviews
app.use('/api/reviews', reviewRouter);

// API Router for kpis
app.use('/api/kpi', kpiRouter);

app.get('/health', (req, res) => {
    res.send('ok');
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

// this needs to be after the routes are defined
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
