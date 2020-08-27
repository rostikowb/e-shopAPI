import { Router } from 'express';

import {userLogin} from '../controllers/users/usersLogin';
import {usersCreate} from '../controllers/users/usersCreate';
import {decodeToken} from "../../middleware/deshifrToken";
import {userReadOne} from "../controllers/users/userRead";
import {checkAdmin} from "../../middleware/checkAdmin";
import {checkAuth} from "../../middleware/checkAuth";
import {userReadAll} from "../controllers/users/usersReadAll";

const router = Router();

router.post('/signup', usersCreate);
router.post('/login', userLogin);
router.post('/read', checkAuth, decodeToken, userReadOne);
router.post('/readAll', checkAdmin, userReadAll);
// router.post('/recov', null);

export default router;
