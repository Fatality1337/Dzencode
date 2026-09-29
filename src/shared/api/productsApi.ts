import {apiClient} from './client'; import type {Product} from '../types/domain'; export const productsApi={list:()=>apiClient.get<Product[]>('/products').then((r)=>r.data)};
