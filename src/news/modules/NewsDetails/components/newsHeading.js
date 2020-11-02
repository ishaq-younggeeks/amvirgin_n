import React from "react";

class NewsHeading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="container">
        <div class="newscredit">
          <h4><span>Entertainment</span></h4>
          <h2> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</h2>
          <h5>Srishti Magan</h5>
          <h6>Jan 12, 2020</h6> 
        </div>
      </div>
    )
  }
}
export default NewsHeading;