import { ADD_ITEM, REMOVE_ALL_ITEMS, REMOVE_ITEM } from "../../types/OrderBikeTypes/orderBikeTypes";
import { Order } from "../../actions/OrderBikeActions/orderBikeActions"
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
                ...state.orderList.filter(order => remove_by_id(order, action.payload))
            };
        case REMOVE_ALL_ITEMS:
            return {
                error:"",
                orderList: []
            };
        default:
            return state;
    }
}

// Helper function to determine which item to remove from array. (Used for filter function)
const remove_by_id = (order: Order, id_to_remove: number) => {
    if (order.id !== id_to_remove) {
        return true
    } else {
        return false
    }
}
export default reducer;