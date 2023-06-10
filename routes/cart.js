import  { Router }  from 'express';
import create from '../controllers/carrito/createAndUpdate.js';
import read from '../controllers/carrito/read.js';
import deleteCart from '../controllers/carrito/delete.js'
import subtractAndDeleteCart from '../controllers/carrito/subtractAndDelete.js'
//import confirmPurchase from '../controllers/carrito/confirmcart.js';
let router = Router()

router.post('/create', create); // Agregar un producto al carrito
router.get('/:userEmail', read); // Ver el contenido del carrito
router.delete('/delete', deleteCart); // Eliminar un producto del carrito
router.put('/subtract', subtractAndDeleteCart); // restar cantidad si es 0 se elimina
//router.post('/confirm',confirmPurchase)
export default router