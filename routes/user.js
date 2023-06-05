import  { Router }  from 'express';
import read from '../controllers/user/read.js'
let router = Router()

router.get('/', read);
  
export default router