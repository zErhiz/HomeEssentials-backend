import express from 'express';
import authRouter from './auth.js'
import categoryRouter from './categories.js'
import manufacturerRouter from './manufacturer.js'
import productRouter from './product.js'
import userRouter from './user.js'  
//const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Challenge',
    subtitle: 'Challenge final',
  });
});



router.use('/auth', authRouter)
router.use('/categories', categoryRouter)
router.use('/manufacturers', manufacturerRouter)
router.use('/products', productRouter)
router.use('/users', userRouter)
export default router;