import { Router } from 'express';

import {userLogin} from '../controllers/users/usersLogin';
import {usersCreate} from '../controllers/users/usersCreate';
import {decodeToken} from "../../middleware/deshifrToken";
import {userReadOne} from "../controllers/users/userRead";
import {isAdmin} from "../../middleware/isAdmin";
import {checkAuth} from "../../middleware/checkAuth";
import {userReadAll} from "../controllers/users/usersReadAll";
import {userRestore1} from "../controllers/users/restorePass/userRestore1";
import {userRestore0} from "../controllers/users/restorePass/userRestore0";
import {userRestore2} from "../controllers/users/restorePass/userRestore2";
import {userUpdateOne} from "../controllers/users/userUpdateOne";


const router = Router();

router.post('/signup', usersCreate);
router.post('/login', userLogin);
router.post('/read', checkAuth, decodeToken, userReadOne);
router.post('/readAll', isAdmin, userReadAll);
router.post('/update', isAdmin, userUpdateOne);
router.post('/restore0', userRestore0);
router.post('/restore1', userRestore1);
router.post('/restore2', userRestore2);

export default router;