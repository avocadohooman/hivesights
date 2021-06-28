import logger from '../utils/logger';
import jwt from 'jsonwebtoken';

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
 
const userExtractor = async (req: any, res: any, next: any) => {
  if (process.env.NODE_ENV !== "server" && process.env.NODE_ENV !== "test") {
    const decodedToken: any = jwt.verify(req.token, process.env.SECRET as string);
    if (decodedToken.userName !== "gmolin") {
        return res.status(400).json({error: "Invalid rights"});
    }
  }
  next();
}

export default {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
};
