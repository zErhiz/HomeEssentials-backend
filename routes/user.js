import  { Router }  from 'express';
import read from '../controllers/user/read.js'
import read_id from '../controllers/user/read_id.js'
let router = Router()

router.get('/:email', read_id);
router.get('/', read);

export default router