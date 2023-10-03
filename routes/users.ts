import { NextFunction, Request, Response } from "express";
import addUser from "../controllers/addUser";
import login from "../controllers/login";

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.send('respond with a resource');
});

router.post('/login',login);
router.post('/register',addUser);

module.exports = router;
