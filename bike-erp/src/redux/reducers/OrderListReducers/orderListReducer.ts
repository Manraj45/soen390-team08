import {
  ADD_ITEM,
  UPDATE_QUANTITY,
  REMOVE_ALL_ITEMS,
  REMOVE_ITEM
} from "../../types/OrderListTypes/orderListTypes";

import { Order } from "../../actions/OrderListActions/orderListAction";

const initialState = {
    error: "",
    orderList: []
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        orderList: [...state.orderList, action.payload]
      };

    case REMOVE_ITEM:
      return {
        ...state,
        orderList: action.payload
      };
    case REMOVE_ALL_ITEMS:
      return {
        error: "",
        orderList: []
      };
    case UPDATE_QUANTITY:{
      return{
        ...state,
        orderList: action.payload
      }
    };
    default:
      return state;
  }
}

export default reducer;