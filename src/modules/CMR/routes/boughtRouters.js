import { Router } from 'express';
import {boughtCreate} from "../controllers/bought/create";
import {decodeToken} from "../../middleware/deshifrToken";
import {checkAuth} from "../../middleware/checkAuth";
import {isAdmin} from "../../middleware/isAdmin";
import {boughtReadAll} from "../controllers/bought/read/boughtReadAll";
import {boughtReadOne} from "../controllers/bought/read/readOne";

const router = Router();

router.post('/create', decodeToken, boughtCreate);
router.post('/readOne/:id', checkAuth, isAdmin, boughtReadOne);
router.post('/readAll', checkAuth, isAdmin, boughtReadAll);

// router.post('/read', checkAuth, decodeToken, boughtRead);
// router.post('/update', checkAuth, decodeToken, isAdmin, boughtRead);
// router.post('/delete', checkAuth, decodeToken, isAdmin, boughtRead);
export default router;
