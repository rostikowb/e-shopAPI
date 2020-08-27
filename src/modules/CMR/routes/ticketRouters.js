import { Router } from 'express';
import {ticketsCreate} from "../controllers/ticket/ticketCreate";
import {decodeToken} from "../../middleware/deshifrToken";
import {checkAuth} from "../../middleware/checkAuth";
import {checkAdmin} from "../../middleware/checkAdmin";
import {ticketsReadAll} from "../controllers/ticket/ticketReadAll";

const router = Router();

router.post('/create', decodeToken, ticketsCreate);
router.post('/readAll', checkAuth, checkAdmin, ticketsReadAll);
// router.post('/read', checkAuth, decodeToken, boughtRead);
// router.post('/update', checkAuth, decodeToken, checkAdmin, boughtRead);
// router.post('/delete', checkAuth, decodeToken, checkAdmin, boughtRead);
export default router;