import React from 'react'
import { Link } from 'react-router-dom';


 const OrderList = (props) =>{
    const {items}  = props
    return (
        <>
         {items.subOrders
                ? items.subOrders.map((item2) =>
                    item2.items
                      ? item2.items.map((item3) => (
        <div
        className="col-sm-12"
        style={{ margin: "0 0 2rem 3rem", width: "95%" }}
      >
        <div className="whitepbox">
          <div
            className="row"
            style={{ height: "170px", alignItem: "center" }}
          >
            <div className="col-sm-1">
              {items.details.image ? (
                <img
                  src={items.details.image}
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
                            style={{
                              fontSize: "18px",
                              padding: "10px 0",
                              fontWeight: "400px",
                              marginLeft: "6rem",
                            }}
                          >
                            {item3.product.name}
                          </p>
              
              <p
                style={{
                  fontSize: "15px",
                  padding: "10px 0",
                  fontWeight: "400px",
                  marginLeft: "6rem",
                }}
              >
                Quantity : {item3.quantity}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  padding: "10px 0",
                  fontWeight: "400px",
                  marginLeft: "6rem",
                }}
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
              <Link className="ml-3 btn btn-primary text-white" to="/myprofile/myOrders/review">
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