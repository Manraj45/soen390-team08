import "./OrderBiling.css";

const OrderBiling = () => {
  return(
    <div className="orderBiling">
      <div className="header">
        Biling
      </div>
      <div className="contents">
        {
          /* Dynamically create components from list */
        }
      </div>
      <div className="total">
        <p>Total: </p>
        <p>{ /* dynamically compute total */}</p>
      </div>
    </div>
  );
}

export default OrderBiling;