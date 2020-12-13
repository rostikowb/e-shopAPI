import { Router } from 'express';
import {ticketsCreate} from "../controllers/ticket/ticketCreate";
import {decodeToken} from "../../middleware/deshifrToken";
import {checkAuth} from "../../middleware/checkAuth";
import {isAdmin} from "../../middleware/isAdmin";
import {ticketsReadAll} from "../controllers/ticket/ticketReadAll";
import {ticketUpdate} from "../controllers/ticket/ticketUpdate";

const router = Router();

router.post('/create', decodeToken, ticketsCreate);
router.post('/readAll', checkAuth, isAdmin, ticketsReadAll);
// router.post('/read', checkAuth, decodeToken, boughtRead);
router.post('/update', checkAuth, isAdmin, ticketUpdate);
// router.post('/delete', checkAuth, decodeToken, isAdmin, boughtRead);
export default router;