import express from 'express';
const Router = express.Router();

import {googleAuth,googleUser,deleteUser} from '../controller/google-auth.js';


Router.route('/auth').post(googleAuth);
Router.route('/user').post(googleUser).delete(deleteUser);

export default Router;
