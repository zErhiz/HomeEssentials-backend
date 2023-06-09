import  { Router }  from 'express';
import create from '../controllers/carrito/create.js';
import read from '../controllers/carrito/read.js';
import deleteCart from '../controllers/carrito/delete.js'
import confirmPurchase from '../controllers/carrito/confirmcart.js';
let router = Router()

router.post('/create', create); // Agregar un producto al carrito
router.get('/:userId', read); // Ver el contenido del carrito
router.delete('/delete', deleteCart); // Eliminar un producto del carrito
router.post('/confirm',confirmPurchase)
export default router