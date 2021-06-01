import logger from '../utils/logger';

const requestLogger = (request: any, response: any, next: any) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
}

const unknownEndpoint = (request: any, response: any, next: any) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

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
}

export default {
    requestLogger,
    unknownEndpoint,
    errorHandler
}
