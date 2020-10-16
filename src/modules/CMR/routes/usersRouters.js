import { Router } from 'express';

import {userLogin} from '../controllers/users/usersLogin';
import {usersCreate} from '../controllers/users/usersCreate';
import {decodeToken} from "../../middleware/deshifrToken";
import {userReadOne} from "../controllers/users/userRead";
import {checkAdmin} from "../../middleware/checkAdmin";
import {checkAuth} from "../../middleware/checkAuth";
import {userReadAll} from "../controllers/users/usersReadAll";
import {userRestore1} from "../controllers/users/userRestore1";
import {userRestore0} from "../controllers/users/userRestore0";
import {userRestore2} from "../controllers/users/userRestore2";


const router = Router();

router.post('/signup', usersCreate);
router.post('/login', userLogin);
router.post('/read', checkAuth, decodeToken, userReadOne);
router.post('/readAll', checkAdmin, userReadAll);
router.post('/restore0', userRestore0);
router.post('/restore1', userRestore1);
router.post('/restore2', userRestore2);

export default router;
