/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { User } from '../types/user';
dotenv.config();

// Setting up variables for production environment
const backendURI = process.env.NODE_ENV === 'production' ? 'https://hivesights.herokuapp.com' : 'http://localhost:3000';
const redirectURI = `${backendURI}/api/auth/42/callback`;
const userToken: any = {};

// Getting 42 Authorization URL
const get42URL = () => {
    const APIbaseURL = 'https://api.intra.42.fr/oauth/authorize'; 
    return `${APIbaseURL}?client_id=${process.env.FORTYTWO_CLIENT_ID}&redirect_uri=${redirectURI}&scope=public&response_type=code&state=${process.env.FORTYTWO_STATE}`;
};

// Setting user token with unqiue UUID and setting a 60 minutes expiration
const setUserToken = (user: User) => {
    const userForToken = user;
    const key = uuid();

    userToken[key] = jwt.sign(userForToken, process.env.SECRET as string, { expiresIn: 60*60 });
    return key;
};

// Getting user token and returning error if key is missing
const getUserToken = (req: any, res: any) => {
    if (!req.params.key) {
        return res.status(400).json({error: 'Invalid or missing key'});
    }
    const token = userToken[req.params.key];
    if (!token) {
        return res.status(400).json({error: 'Invalid or missing key'});
    }
    userToken[req.params.key] = null;
    return res.status(200).json({token});
};

// Getting 42 Authorization token from 42 API and reruning token type + access token
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
        return `${data.token_type} ${data.access_token}`;
    } catch (error: any) {
        console.log(`${error.message}`);
    }
};

// Getting user based on token and returning username, id, intraURL, imageURL and internship mid-term validation
const getUser = async (token: any) => {
    try {
        const { data } = await axios.get('https://api.intra.42.fr/v2/me', {
            headers: {
                Authorization: token,
            },
        });
        const internship = data.projects_users.filter((project: { id: number; status: string, project: {id: number}}) => project.project.id === 826);
        let internshipValidated = false;
        if (internship[0].status === 'finished') {
            internshipValidated = true;
        }
        const user: User = {
            id: data.id,
            userName: data.login,
            imageUrl: data.image_url,
            intraUrl: data.url,
            internshipValidated: internshipValidated,
        };
        console.log('Return User: ', user);
        return {
            id: data.id,
            userName: data.login,
            imageUrl: data.image_url,
            intraUrl: data.url,
            internshipValidated: internshipValidated,
        };
    } catch (error: any) {
        console.log(`${error.message}`);
        return ({error: error.message});
    }
};

export default {
    get42URL,
    setUserToken,
    getAuthorizationToken,
    getUser,
    getUserToken
};