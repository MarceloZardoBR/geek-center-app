const express = require('express');
const UserController = require('./controllers/userController');
const ProductController = require('./controllers/productController');
const ChatController = require('./controllers/chatController');

const routes = express.Router();

const authorization = require('./middlewares/auth'); 

routes.post('/user/create', UserController.createUser);
routes.post('/user/auth', UserController.authUser);
routes.get('/user/get/id/', UserController.getUserById);
routes.get('/products/category/', ProductController.getProductByCategory);
routes.get('/products/find/', ProductController.searchProductsName);
routes.post('/products/get/id', ProductController.getProductsById);

routes.use(authorization);

routes.get('/user/get', UserController.getUser);
routes.post('/user/set-address', UserController.addAdress);
routes.post('/user/remove-address', UserController.removeAddress);
routes.post('/user/cart/add', UserController.cartAddProduct);
routes.put('/user/cart/change', UserController.changeCartAmount);

routes.get('/user/chats', ChatController.getUserChats);  
routes.post('/user/chats/new-message', ChatController.newMessage);
routes.get('/user/chats/verify/', ChatController.verifyExistsChat);

routes.post('/product/create', ProductController.createProduct);
routes.get('/products/user/get', ProductController.getUserProducts);
routes.post('/products/user/delete', ProductController.deleteProduct);

module.exports = routes;