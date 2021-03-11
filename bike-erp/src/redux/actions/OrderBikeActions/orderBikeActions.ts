import { ADD_BIKE, REMOVE_BIKE, REMOVE_ALL_BIKES, ADD_COMPONENT, REMOVE_COMPONENT, REMOVE_ALL_COMPONENTS } from '../../types/OrderBikeTypes/orderBikeTypes'

export interface BikeSold {
    id: number,
    quantity: number,
    info: string,
    price: number,
    selectedQuantity: number
}

export interface ComponentUpdated {
    id: number,
    quantity: number
}

export const addBike = (bikeSold: BikeSold) => {
    return {
        type: ADD_BIKE,
        payload: bikeSold
    }
}

export const addComponentSold = (componentUpdated: ComponentUpdated) => {
    return {
        type: ADD_COMPONENT,
        payload: componentUpdated
    }
}

export const removeBike = (index: number) => {
    return {
        type: REMOVE_BIKE,
        payload: index
    }
}

export const removeComponentSold = (id: number) => {
    return {
        type: REMOVE_COMPONENT,
        payload: id
    }
}

export const removeAllBikes = () => {
    return {
        type: REMOVE_ALL_BIKES
    }
}

export const removeAllComponents = () => {
    return {
        type: REMOVE_ALL_COMPONENTS
    }
}