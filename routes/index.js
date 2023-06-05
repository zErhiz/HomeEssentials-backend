import express from 'express';
import userRouter from './auth.js'
//const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Challenge',
    subtitle: 'Challenge final',
  });
});



router.use('/auth', userRouter)

export default router;