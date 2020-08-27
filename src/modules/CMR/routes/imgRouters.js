import router from "./ticketRouters";
import {checkAdmin} from "../../middleware/checkAdmin";
import {checkAuth} from "../../middleware/checkAuth";
import {imgSaveToStatic} from "../controllers/imgUpload/imgSave";

router.post('/save', checkAuth, checkAdmin, imgSaveToStatic);

export default router;