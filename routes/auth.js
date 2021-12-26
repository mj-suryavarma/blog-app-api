import express from 'express'
const Router = express.Router();
import {Login,Register} from '../controller/auth.js';


Router.route('/user/register').post(Register);
Router.route('/user/login').post(Login);


export default Router;