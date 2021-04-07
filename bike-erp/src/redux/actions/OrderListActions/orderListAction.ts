import {
  ADD_ITEM,
  REMOVE_ALL_ITEMS,
  REMOVE_ITEM,
  UPDATE_QUANTITY
} from '../../types/OrderListTypes/orderListTypes';

export interface Order {
  id: number
  quantity: number
  info: string,
  price: number
  selectedQuantity: number
}

export const addItem = (order: Order) => {
  return {
    type: ADD_ITEM,
    payload: order
  }
}

export const removeItem = (orderList) => {
  return {
    type: REMOVE_ITEM,
    payload: orderList
  }
}

export const removeAllItem = () => {
  return {
    type: REMOVE_ALL_ITEMS
  }
}

export const updateQuantity = (orderList)=>{
  return{
    type:UPDATE_QUANTITY,
    payload:orderList
  }
}

export const changeQuantity = (orderList: Array<any>, component_id, newQuantitySelected: number) => {
  return (dispatch: any) => {
    const findComponent = (component) => component.id === component_id
    const index = orderList.findIndex(findComponent)
    orderList[index].selectedQuantity = newQuantitySelected
    dispatch(updateQuantity(orderList))
  }
}

export const deleteItemFromCart = (orderList:Array<any>, component_id)=>{
  return (dispatch:any)=>{
    const findComponent = (component) => component.id === component_id
    const index = orderList.findIndex(findComponent)
    orderList.splice(index, 1)
    dispatch(removeItem(orderList))
  }
}