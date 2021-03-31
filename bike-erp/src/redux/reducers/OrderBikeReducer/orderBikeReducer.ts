import {
  ADD_BIKE,
  REMOVE_BIKE,
  REMOVE_ALL_BIKES,
  ADD_COMPONENT,
  REMOVE_COMPONENT,
  REMOVE_ALL_COMPONENTS
} from '../../types/OrderBikeTypes/orderBikeTypes';

import { BikeSold, ComponentUpdated } from "../../actions/OrderBikeActions/orderBikeActions";

const initialState = {
  error: "",
  bikeOrderList: [],
  componentOrderList: []
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_BIKE:
      return {
        ...state,
        bikeOrderList: [...state.bikeOrderList, action.payload]
      };
    case REMOVE_BIKE:
      return {
        ...state,
        bikeOrderList: state.bikeOrderList.filter((bikeSold : BikeSold) => bikeSold !== action.payload)
      };
    case REMOVE_ALL_BIKES:
      return {
        error:"",
        bikeOrderList: [],
        componentOrderList: [...state.componentOrderList]
      };
    case ADD_COMPONENT:
      return {
        ...state,
        componentOrderList: [...state.componentOrderList, action.payload]
      };
    case REMOVE_COMPONENT:
      return {
        ...state,
        componentOrderList: state.componentOrderList.filter((comp: ComponentUpdated) => comp.id !== action.payload)
      };
    case REMOVE_ALL_COMPONENTS:
      return {
        error:"",
        bikeOrderList: [...state.bikeOrderList],
        componentOrderList: []
      };
    default:
      return state;
  }
}

export default reducer;