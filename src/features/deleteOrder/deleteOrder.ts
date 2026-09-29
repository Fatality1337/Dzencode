import type {AppDispatch} from '../../app/store'; import {deleteOrder} from '../../app/store/ordersSlice'; export const deleteOrderCommand=(dispatch:AppDispatch,id:number)=>dispatch(deleteOrder(id));
