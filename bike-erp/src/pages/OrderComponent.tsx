import Components from "../components/OrderService/OrderComponent/Components";
import ModelView from "../components/OrderService/OrderComponent/ModelView"
import OrderBiling from "../components/OrderService/OrderBiling";

import "./OrderComponent.css";

const OrderComponent = () => {
  return (
    <div className="orderComponent">
      <ModelView></ModelView>
      <Components></Components>
      <OrderBiling></OrderBiling>
    </div>
  );
}

export default OrderComponent;