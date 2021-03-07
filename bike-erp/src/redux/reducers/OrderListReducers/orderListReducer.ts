import { ADD_ITEM, REMOVE_ALL_ITEMS, REMOVE_ITEM } from "../../types/OrderListTypes/orderListTypes";
import { Order } from "../../actions/OrderListActions/orderListAction"
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
         //       ...state.orderList.filter(order => remove_by_id(order, action.payload))
                orderList: state.orderList.filter((order : Order) => order.id !== action.payload) 
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
// const remove_by_id = (order: Order, id_to_remove: number) => {
//     console.log(order.id)
//     console.log(id_to_remove)
//     if (order.id !== id_to_remove) {
//         console.log("false")
//         return false
//     } else {
//         console.log("true")
//         return true
//     }
// }
export default reducer;