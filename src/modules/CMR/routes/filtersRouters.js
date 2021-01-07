import {Router} from "express";
import {filterRead} from "../controllers/filters/filterReadCat";
import {filterReCreate} from "../controllers/filters/filterReCreate";
import {isAdmin} from "../../middleware/isAdmin";
import {checkAuth} from "../../middleware/checkAuth";

const router = Router();

router.post('/read/:ctgrId', filterRead);
router.post('/reCreate', checkAuth, isAdmin, filterReCreate);
// router.post('/reCreate', filterReCreate);

export default router;