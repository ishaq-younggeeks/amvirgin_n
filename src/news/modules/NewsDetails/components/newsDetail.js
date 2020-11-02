import React from "react";

import Header from "../../../../entertainment/modules/Header";
import Footer from "../../../../entertainment/modules/Footer";
import NewsHeading from "./newsHeading";
import NewsDetailMainSection from "./newsDetailMainSection";
import NewsListRecomended from "./newsListRecomended";

class NewsDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Header/>
        <div class="newsdetail">
          <NewsHeading/>
          <NewsDetailMainSection/>
          <NewsListRecomended/>
        </div>
        <Footer/>
      </>
    )
  }
}
export default NewsDetail;