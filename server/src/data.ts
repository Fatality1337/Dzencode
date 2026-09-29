import type { Order, Product } from './domain.js';
export const products: Product[] = [
 {id:1,name:'MacBook Pro 16"',serialNumber:'MBP-16-M2-001',type:'Ноутбуки',status:'Свободен',price:2499,currency:'USD',warrantyUntil:'2026-09-12',orderId:1},
 {id:2,name:'Dell UltraSharp U2723QE',serialNumber:'DEL-U27-023',type:'Мониторы',status:'Свободен',price:685,currency:'USD',warrantyUntil:'2026-09-12',orderId:1},
 {id:3,name:'Logitech MX Master 3S',serialNumber:'LOG-MX3-442',type:'Периферия',status:'В ремонте',price:99,currency:'USD',warrantyUntil:'2025-09-08',orderId:2},
 {id:4,name:'Apple iPad Air',serialNumber:'IPA-AIR-109',type:'Планшеты',status:'Свободен',price:799,currency:'USD',warrantyUntil:'2026-09-08',orderId:2},
 {id:5,name:'Sony WH-1000XM5',serialNumber:'SNY-WH5-781',type:'Аксессуары',status:'Списан',price:349,currency:'USD',warrantyUntil:'2025-09-01',orderId:3},
];
export const orders: Order[] = [1,2,3].map((id) => ({ id, name:['Поставка техники Apple','Офисная периферия','Аудио и аксессуары'][id-1], createdAt:`2024-09-${String(13-id).padStart(2,'0')}T10:30:00Z`, updatedAt:`2024-09-${String(13-id).padStart(2,'0')}T10:30:00Z`, supplier:['Apple Distribution','TechnoHub LLC','Sound Store'][id-1], products:products.filter((product)=>product.orderId===id) }));
