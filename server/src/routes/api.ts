import { Router } from 'express';
import { createOrder, getOrder, listOrders, removeOrder } from '../controllers/ordersController.js';
import { createProduct, deleteProduct, listProducts, updateProduct } from '../controllers/productsController.js';
import {
  createGroup,
  createUser,
  deleteGroup,
  deleteUser,
  listGroups,
  listUsers,
  updateGroup,
  updateUser,
} from '../controllers/managementController.js';
const router = Router();
router
  .get('/orders', listOrders)
  .post('/orders', createOrder)
  .get('/orders/:id', getOrder)
  .delete('/orders/:id', removeOrder)
  .get('/products', listProducts)
  .post('/products', createProduct)
  .patch('/products/:id', updateProduct)
  .delete('/products/:id', deleteProduct)
  .get('/groups', listGroups)
  .post('/groups', createGroup)
  .patch('/groups/:id', updateGroup)
  .delete('/groups/:id', deleteGroup)
  .get('/users', listUsers)
  .post('/users', createUser)
  .patch('/users/:id', updateUser)
  .delete('/users/:id', deleteUser);
export default router;
