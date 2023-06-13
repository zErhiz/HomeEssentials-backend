import  { Router }  from 'express';

import create from "../controllers/products/create_product.js"
import update from "../controllers/products/edit_product.js"
import deleteAdmin from "../controllers/products/delete_one.js"
let router = Router()

router.post('/products', create);
router.put('/update/:id', update)
router.delete('/deleteone/:id', deleteAdmin)

export default router