import  { Router }  from 'express';

import create from "../controllers/products/create_product.js"
import update from "../controllers/products/edit_product.js"
let router = Router()

router.post('/products', create);
router.put('/update', update)

export default router