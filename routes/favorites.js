import  { Router }  from 'express';
import create from '../controllers/favorites/create.js';
import read from '../controllers/favorites/read.js';
let router = Router()

router.post('/', create);
router.get('/', read);

export default router