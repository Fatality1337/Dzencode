import { eventBus } from '../events/eventBus.js'; import { ProductRepository } from '../repositories/productRepository.js';
export class ProductService { constructor(private readonly repository=new ProductRepository()){} list(){const products=this.repository.findAll();eventBus.emit('PRODUCT_FILTERED',{count:products.length});return products} }
