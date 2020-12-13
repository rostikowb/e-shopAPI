import router from "./ticketRouters";
import {isAdmin} from "../../middleware/isAdmin";
import {checkAuth} from "../../middleware/checkAuth";
import {imgSaveToStatic} from "../controllers/imgUpload/imgSave";

router.post('/save', checkAuth, isAdmin, imgSaveToStatic);

export default router;