const { Router } = require('express');
const {userController} = require('./controller');


const userRouter = new Router();
module.exports = { userRouter };

userRouter.get('/',userController.getUsers); 
userRouter.get('/:id',userController.getUser);
// userRouter.post('/',userController.addUser); 
// userRouter.put('/:id',userController.updateUser); //localhostn:8080/api/users/#id
userRouter.delete('/:id',userController.deleteUser); //localhostn:8080/api/users/#id
