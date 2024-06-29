import {Router} from 'express';
import { addProducts, getProducts, removeProduct } from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route("/add").post(
    upload.array("productImages", 10),
    addProducts
);

router.route("/remove").delete(removeProduct);
router.route("/").get(getProducts);

export default router;