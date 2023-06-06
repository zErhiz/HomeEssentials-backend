import  { Router }  from 'express';
import read from '../controllers/products/read.js'
import productsPaginationHome from "../controllers/products/best_sellers.js"
let router = Router()

router.get('/', read);
router.get('/sixcards', productsPaginationHome)
export default router