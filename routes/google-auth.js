import express from 'express';
const Router = express.Router();

import {googleAuth} from '../controller/google-auth.js';


Router.route('/google/auth').post(googleAuth);



export default Router;
