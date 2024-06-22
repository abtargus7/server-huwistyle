import {Route} from 'express';
import { addProducts } from '../controllers/product.controller';

const router = Router();

router.route("/add").post(addProducts);

export default router;