import logger from '../utils/logger';
import jwt from 'jsonwebtoken';
import pool from '../db';

const reviewTable = process.env.NODE_END === 'production' ? 'review' : 'review_test';
const companyTable = process.env.NODE_END === 'production' ? 'company' : 'company_test';

const requestLogger = (request: any, response: any, next: any) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};

const unknownEndpoint = (request: any, response: any, next: any) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error: any, request: any, response: any, next: any) => {
    logger.error(error.message);
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      });
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      });
    } else {
          response.status(400).json({ error: error.message });
    }
    next(error);
};

const tokenExtractor = (req: any, res: any, next: any) => {
  const authorization: string = req.get('authorization');
  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    req.token = authorization.substr(7);
  } else {
    req.token = null;
  }
  next();
};
 
const userExtractorCompanyRights = async (req: any, res: any, next: any) => {
  if (process.env.NODE_ENV !== "test") {
    const decodedToken: any = jwt.verify(req.token, process.env.SECRET as string);
    if (!decodedToken || decodedToken.userName !== "gmolin") {
        return res.status(400).json({error: "Invalid rights"});
    }
  }
  next();
};

const userExtractorReviewRights = async (req: any, res: any, next: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const reviewId: string = req.params.id;
  if (process.env.NODE_ENV !== "test") {
    console.log('ID', reviewId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userNameDb = await pool.query(`SELECT username FROM ${reviewTable} WHERE id = ($1)`, [reviewId])
      .catch((e:any) => {
        if (e) {
          console.log("ERROR", e);
          throw new Error("ERROR: " + e.message);
        }
      });
    console.log('Got user', userNameDb);
    const decodedToken: any = jwt.verify(req.token, process.env.SECRET as string);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userName = userNameDb.rows[0].username;    
    if (userName !== decodedToken.userName || !decodedToken) {
      return res.status(400).json({error: 'Invalid rights'});
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  next();
};


export default {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractorCompanyRights,
    userExtractorReviewRights
};
