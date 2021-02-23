import React, {useState} from "react";
import { Link } from "react-router-dom";
import Header from "../../../entertainment/modules/Header";
import SubMenu from "../Home/components/SubMenu";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import {giveReviewFnc} from "./ViewMyOrdersAction";

const AddReview = (props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  console.log({rating});
  console.log({comment});
  console.log({image});

  const onImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0])
  }

  const onSubmitHandle = (e) => {
    e.preventDefault();
    if(rating && rating > 0){
    let productKey = props.match.params.product;
    let orderKey = props.match.params.order; 
    console.log({orderKey});
    console.log({productKey});
    props.giveReviewFnc(productKey, orderKey, {rating, comment, image});
    console.log("API Calling!");
    }
  }

  return (
    <div>
      <Header />
      <SubMenu {...props} />
      <div style={{ margin: "2rem 2rem 0 2rem" }}>
          <h3 style={{ color: "#ce3838" }}>
            <Link to="/myprofile/myOrders/" style={{ color: "#9e2e2e" }}>
              My Orders
            </Link>
            <span style={{ color: "black" }}> {">"}</span> Add Review
            <span style={{ color: "black" }}>{">"}</span>
          </h3>
          <hr
            style={{
              color: "red",
              backgroundColor: "#ce3838",
              height: 1,
              borderColor: "#ce3838",
            }}
          />
        </div>
        <div
          className="card"
          style={{ margin: "0 0 2rem 3rem", width: "28rem" }}
        >
        <form onSubmit={onSubmitHandle}>  
        <div className="">
        <lable htmlFor="stars" className="label">Rate Us : </lable>  
        <ReactStars 
        classNames="mt-2"
				value={rating}
				count={5}
				size={40}
				color="#CAD3D0"
				activeColor="#ffd700"
        onChange={(newValue) => setRating(newValue)}
				/>
        </div>
        <div className="w-100 mt-5">
        <lable htmlFor="comment" className="label">Comment : (Optional)</lable>
        <input className="border border-dark mt-2 bg-white" type="text" id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
        </div>
        <div className="w-100 mt-5">
        <lable htmlFor="image" className="label">Upload Your Image : (Optional)</lable>
        <input className="mt-2 bg-white border border-white" type="file" accept="jpeg/png/jpg/" onChange={onImageChange}/>
        </div>
        <button className="btn btn-primary mt-3" type="submit">Submit</button>
        </form>
        </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    reviewProvided: state.MyOrders.giveReview
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    giveReviewFnc: (key, orderKey, rating) => dispatch(giveReviewFnc(key, orderKey, rating))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);


