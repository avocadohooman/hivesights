import express from 'express';
import authServices from '../services/42Services';
import { User } from '../types/user';

const authRouter = express.Router();
const FRONTEND_URL = process.env.NODE_ENV === 'production' ? 'http://localhost' : process.env.FRONTEND_URL_DEV;

authRouter.get('/42', (req, res) => {
    try {
        return res.json({url: authServices.get42URL()});
    } catch (error: any) {
        console.log(error.message);
    }    
});

// // eslint-disable-no-misused-promises
authRouter.get('/42/callback', async (req, res) => {
    const {code, state} = req.query;
    if (code === undefined || state !== process.env.FORTYTWO_STATE) {
        return res.redirect('http://localhost:3000');
    }
    try {
        console.log("Getting token");
        const token = await authServices.getAuthorizationToken(code, state);
        console.log("Getting user");
        const user = await authServices.getUser(token);
        const userForToken: User = {
            id: user.id,
            userName: user.userName,
            imageUrl: user.imageUrl,
            intraUrl: user.intraUrl,
            internshipValidated: user.internshipValidated,
        }
        console.log("User for Token", userForToken);
        const key = authServices.setUserToken(userForToken);
        return res.redirect(`${FRONTEND_URL}?auth=${key}`);
    } catch (error: any) {
        console.log(error.message);
    }
});

authRouter.get('/token/:key', async (res, req) => {
    console.log("Getting user token");
    await authServices.getUserToken(res, req);
});

export default authRouter;