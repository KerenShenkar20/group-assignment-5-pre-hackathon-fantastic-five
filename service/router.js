const { Router } = require('express');
const {userController} = require('./controller');


const userRouter = new Router();
module.exports = { userRouter };

userRouter.get('/',userController.getUsers); 
userRouter.get('/filter',userController.filterUsers); 
userRouter.get('/:id',userController.getUser);
userRouter.post('/',userController.addUser); 
userRouter.put('/:id',userController.updateUser); 
userRouter.delete('/:id',userController.deleteUser);