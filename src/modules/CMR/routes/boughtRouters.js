import { Router } from 'express';
import {boughtCreate} from "../controllers/bought/create";
import {decodeToken} from "../../middleware/deshifrToken";
import {checkAuth} from "../../middleware/checkAuth";
import {checkAdmin} from "../../middleware/checkAdmin";
import {boughtReadAll} from "../controllers/bought/boughtReadAll";

const router = Router();

router.post('/create', decodeToken, boughtCreate);
router.post('/readAll', checkAuth, checkAdmin, boughtReadAll);

// router.post('/read', checkAuth, decodeToken, boughtRead);
// router.post('/update', checkAuth, decodeToken, checkAdmin, boughtRead);
// router.post('/delete', checkAuth, decodeToken, checkAdmin, boughtRead);
export default router;
