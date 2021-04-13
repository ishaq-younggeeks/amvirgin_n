import React from "react";
import "../../../style.css"
import Header from "../../../../entertainment/modules/Header";
import Footer from "../../../../entertainment/modules/Footer";
import NewsEvents from "./NewsEvents";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: true
    }
  }

  componentDidMount = () => {
    this.props.newsCategoryFnc();
  }

  render() {
    return (  
      <>
        <Header/>
        <div class="newsbody">
          <NewsEvents category={this.props.newsCategory}/>
          <Footer/>
        </div>
      </>
    )
  }
}

export default News;  