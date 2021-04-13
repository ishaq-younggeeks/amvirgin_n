import React from 'react'
import { Link } from 'react-router-dom';
import './ViewMyOrders.css';


 const OrderList = (props) =>{
    const {items}  = props
    return (
        <>
         {items.subOrders
                ? items.subOrders.map((item2) =>
                    item2.items
                      ? item2.items.map((item3) => (
        <div
        className="col-sm-12 orderlist"
      >
        <div className="whitepbox">
          <div
            className="row orderlist-row"
          >
            <div className="col-sm-1 order-img">
              {item3.product ? (
                <img
                  src={item3.product.image}
                  style={{
                    width: "9rem",
                    objectFit: "cover",
                    height: "150px",
                    margin: "2px 0 0 3rem",
                  }}
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/img/default.png"}
                  style={{
                    width: "9rem",
                    objectFit: "cover",
                    height: "150px",
                    margin: "2px 0 0 3rem",
                  }}
                />
              )}
            </div>
            <div className="col-sm-4">
              <p
              className="ol-product-name"
              >
              {item3.product.name}
              </p>          
              <p
                className="ol-quantity-total"
              >
                Quantity : {item3.quantity}
              </p>
              <p
                className="ol-quantity-total"
              >
                Total : ₹ {item3.total}
              </p>
            </div>
            <div className="col-sm-4">
              <p
                style={{
                  fontSize: "17px",
                  padding: "10px 0",
                  fontWeight: "400px",
                }}
              >
                Order # : {items.details.number}
              </p>
              <p
                style={{
                  fontSize: "17px",
                  padding: "10px 0",
                  fontWeight: "400px",
                }}
              >
                Date : {items.details.placed}
              </p>
              <p
                style={{
                  fontSize: "17px",
                  padding: "10px 0",
                  fontWeight: "400px",
                }}
              >
                Status : <span style={{ color:items.details.status === "cancelled" ? "#ce3838" : "green" }}>{items.details.status}</span>
              </p>
            </div>
            <div className="col-sm-3">
              <Link className="btn btn-primary text-white" to={`/myprofile/myOrders/${items.key}/orderDetails/${item3.key}`}>
                  Order Details
              </Link>
              <Link className="ml-3 btn btn-primary text-white" to={`/myprofile/myOrders/review/${items.key}/${item3.key}`}>
                  Add a review
              </Link>
            </div>
          </div>
        </div>
      </div>
                ))
                : null
            )
          : null}
      </>
    )
}

export default OrderList;