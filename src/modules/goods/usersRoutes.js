import { Router } from 'express';

import {userLogin} from './controllers/users/usersLogin';
import {usersCreate} from './controllers/users/usersCreate';

const router = Router();

router.post('/signup', usersCreate);
router.post('/login', userLogin);
// router.post('/recov', null);

export default router;
