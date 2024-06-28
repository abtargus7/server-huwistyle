import {Router} from 'express';
import { addProducts, getProducts, uploadImage } from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route("/add").post(addProducts);
router.route("/").get(getProducts);
router.route("/upload").post(upload.single("image"), uploadImage )

export default router;