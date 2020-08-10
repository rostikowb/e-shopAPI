import { Router } from 'express';

import {userLogin} from './controllers/users/usersLogin';
import {usersCreate} from './controllers/users/usersCreate';
import {decodeToken} from "../middleware/deshifrToken";
import {userRead} from "./controllers/users/userRead";

const router = Router();

router.post('/signup', usersCreate);
router.post('/login', userLogin);
router.post('/read', decodeToken, userRead);
// router.post('/recov', null);

export default router;
