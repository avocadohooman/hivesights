import express from 'express';
import authServices from '../services/42Services';

const authRouter = express.Router();

authRouter.get('/42', async (req, res) => {
    try {
        return res.json({url: authServices.get42URL()});
    } catch (error) {
        console.log(error.message);
    }    
});

authRouter.get('/42/callback', async (req, res) => {
    const {code, state} = req.query;
    if (code === undefined || state !== process.env.FORTYTWO_STATE) {
        return res.redirect('http://localhost:3000')
    }
    try {
        console.log("Getting token");
        const token = await authServices.getAuthorizationToken(code, state);
        console.log("Getting user");
        const user = await authServices.getUser(token);
        const key = authServices.setUserToken(user!.id);
        return res.redirect(`http://localhost:3000?auth=${key}`)
    } catch (error) {
        console.log(error.message);
    }    
});

export default authRouter;