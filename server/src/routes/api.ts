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
import { login } from '../controllers/authController.js';
import { requireAuth } from '../auth.js';
const router = Router();
router.post('/auth/login', login);
router
  .get('/orders', listOrders)
  .post('/orders', createOrder)
  .get('/orders/:id', getOrder)
  .delete('/orders/:id', requireAuth, removeOrder)
  .get('/products', listProducts)
  .post('/products', requireAuth, createProduct)
  .patch('/products/:id', requireAuth, updateProduct)
  .delete('/products/:id', requireAuth, deleteProduct)
  .get('/groups', listGroups)
  .post('/groups', requireAuth, createGroup)
  .patch('/groups/:id', requireAuth, updateGroup)
  .delete('/groups/:id', requireAuth, deleteGroup)
  .get('/users', listUsers)
  .post('/users', requireAuth, createUser)
  .patch('/users/:id', requireAuth, updateUser)
  .delete('/users/:id', requireAuth, deleteUser);
export default router;
