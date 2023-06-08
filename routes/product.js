import  { Router }  from 'express';
import read from '../controllers/products/read.js'
import productsPaginationHome from "../controllers/products/best_sellers.js"
import  searchProducts  from '../controllers/products/search_products.js';
let router = Router()

router.get('/', read);
router.get('/sixcards', productsPaginationHome)
router.get('/search',searchProducts)
export default router