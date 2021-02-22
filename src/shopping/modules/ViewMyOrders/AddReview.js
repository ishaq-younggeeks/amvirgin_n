import React from "react";
import Header from "../../../entertainment/modules/Header";
import SubMenu from "../Home/components/SubMenu";

const AddReview = (props) => {
  return (
    <div>
      <Header />
      <SubMenu {...props} />
      <h1>Hello</h1>
    </div>
  );
};

export default AddReview;


