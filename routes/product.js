import  { Router }  from 'express';
import read from '../controllers/products/read.js'
let router = Router()

router.get('/', read);
  
export default router