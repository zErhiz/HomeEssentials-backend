import  { Router }  from 'express';
import saved from '../controllers/contact/saved.js';
let router = Router()

router.post('/', saved);
  
export default router