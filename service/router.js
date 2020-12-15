const { Router } = require('express');
const {userController} = require('./controller');


const userRouter = new Router();
module.exports = { userRouter };

userRouter.get('/',userController.getUsers); 
userRouter.get('/:id',userController.getUser);