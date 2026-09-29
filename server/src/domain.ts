export type Currency = 'USD' | 'EUR' | 'UAH';
export interface Product { id:number; name:string; serialNumber:string; type:string; status:string; price:number; currency:Currency; warrantyUntil:string; orderId:number; }
export interface Order { id:number; name:string; createdAt:string; updatedAt:string; supplier:string; products:Product[]; }
export interface CreateOrderInput { name:string; supplier:string; product:{name:string; type:string; price:number; warrantyUntil:string} }
