import React, { Component } from "react";
import Header from "../../../entertainment/modules/Header";
import SubMenu from "../Home/components/SubMenu";

export default class TrackOrder extends Component {
  render() {
    return (
      <>
        <Header />
        <SubMenu {...this.props} />
      </>
    );
  }
}
