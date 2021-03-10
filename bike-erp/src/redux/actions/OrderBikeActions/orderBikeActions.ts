import {ADD_ITEM, REMOVE_ALL_ITEMS, REMOVE_ITEM} from '../../types/OrderListTypes/orderListTypes'

export interface Order{
    id:number
    quantity:number
    info:string,
    price:number
}

export const addItem = (order:Order)=>{
    return {
        type: ADD_ITEM,
        payload:order
    }
}

export const removeItem = (index:number)=>{
    return {
        type:REMOVE_ITEM,
        payload:index
    }
}

export const removeAllItem = ()=>{
    return {
        type:REMOVE_ALL_ITEMS
    }
}