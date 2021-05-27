import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';

export interface User {
    id:  number,
    userName: string
}

dotenv.config() 
const authRouter = express.Router();

const backendURI = 'http://localhost:3000'
const redirectURI = `${backendURI}/api/auth/42/callback`;
const userToken: any = {};

const get42URL = () => {
    const APIbaseURL = 'https://api.intra.42.fr/oauth/authorize'; 
    return `${APIbaseURL}?client_id=${process.env.FORTYTWO_CLIENT_ID}&redirect_uri=${redirectURI}&scope=public&response_type=code&state=${process.env.FORTYTWO_STATE}`;

}

const setUserToken = (id: any) => {
    const userForToken = {id};
    const key = uuid();

    userToken[key] = jwt.sign(userForToken, process.env.SECRET as string);

    return key;
}

authRouter.get('/42', async (req, res) => {
    try {
        return res.json({url: get42URL()});
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
        const token = await getAuthorizationToken(code, state);
        console.log("Getting user");
        const user = await getUser(token);
        const key = setUserToken(user!.id);
        return res.redirect(`http://localhost:3000?auth=${key}`)
    } catch (error) {
        console.log(error.message);
    }    
});

const getAuthorizationToken = async (code: any, state: any) => {
    console.log('STATE', state, code);
    try {
        const { data } = await axios.post('https://api.intra.42.fr/oauth/token', {
            grant_type: 'authorization_code',
            client_id: process.env.FORTYTWO_CLIENT_ID,
            client_secret: process.env.FORTYTWO_CLIENT_SECRET,
            code,
            state,
            redirect_uri: redirectURI,
        });
        console.log("DATA", data);
        return `${data.token_type} ${data.access_token}`;
    } catch (error) {
        console.log(`${error.message}`);
    }
}

const getUser = async (token: any) => {
    console.log("TOKEN", token);
    try {
        const { data } = await axios.get('https://api.intra.42.fr/v2/me', {
            headers: {
                Authorization: token,
            },
        });
        console.log("USER DATA", data.id, data.login);
        return {
            id: data.id,
            userName: data.login
        };
    } catch (error) {
        console.log(`${error.message}`);
    }

}


export default authRouter;