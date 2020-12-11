import {Router} from "express";
import {filterRead} from "../controllers/filters/filterReadCat";
import {filterReCreate} from "../controllers/filters/filterReCreate";
import {checkAdmin} from "../../middleware/checkAdmin";
import {checkAuth} from "../../middleware/checkAuth";

const router = Router();

router.post('/read/:ctgrId', filterRead);
// router.post('/reCreate', checkAuth, checkAdmin, filterReCreate);
router.post('/reCreate', filterReCreate);

export default router;