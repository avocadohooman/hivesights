/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import logger from '../utils/logger';
import jwt from 'jsonwebtoken';
import pool from '../db';

const reviewTable = process.env.NODE_ENV === 'production' ? 'review' : 'review_test';


// logging requests in CLI
const requestLogger = (request: any, response: any, next: any) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};

// unknow endpoint return
const unknownEndpoint = (request: any, response: any) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

// handling errors depending on type
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

// extracting tokens for certain routes
const tokenExtractor = (req: any, res: any, next: any) => {
  const authorization: string = req.get('authorization');
  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    req.token = authorization.substr(7);
  } else {
    req.token = null;
  }
  next();
};
 
// extracting user for creating a company in companyRoute, currently only user 'gmolin
// can create a company
const userExtractorCompanyRights = (req: any, res: any, next: any) => {
  if (process.env.NODE_ENV !== "test") {
    const decodedToken: any = jwt.verify(req.token, process.env.SECRET as string);
    // if (!decodedToken || decodedToken.userName !== "gmolin") {
    //     return res.status(400).json({error: "Invalid rights"});
    // }
	if (!decodedToken) {
        return res.status(400).json({error: "Invalid rights"});
    }
  }
  next();
};

// extracting user for creating a new review
// checking if user has created the review as only the user who is the author can delete a review
const userExtractorReviewRights = async (req: any, res: any, next: any) => {
  const reviewId: string = req.params.id;
  if (process.env.NODE_ENV !== "test") {
    const userNameDb = await pool.query(`SELECT username FROM ${reviewTable} WHERE id = ($1)`, [reviewId])
      .catch((e:any) => {
        if (e) {
          console.log("ERROR", e);
          throw new Error("ERROR: " + e.message);
        }
      });
    const decodedToken: any = jwt.verify(req.token, process.env.SECRET as string);
    let userName: any;  
    if (userNameDb.rows[0]) {
      userName = userNameDb.rows[0].username;
    }
    if (!userName || userName !== decodedToken.userName || !decodedToken) {
      return res.status(400).json({error: 'Invalid rights'});
    }
  }
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
