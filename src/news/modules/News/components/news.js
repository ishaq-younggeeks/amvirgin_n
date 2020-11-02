import React from "react";

import "../../../style.css"
import Header from "../../../../entertainment/modules/Header";
import Footer from "../../../../entertainment/modules/Footer";
import Banner from "./banner";
import NewsEvents from "./newsEvents";
import MainNewsSection from "./mainNewsSection";
import NewsVideoSection from "./newsVideoSection";
import MoreNews from "./moreNews";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: true
    }
  }

  componentWillMount() {
    this.props.newsListData();
  }

  render() {
    return (  
      <>
        <Header/>
        <div class="newsbody">
          <Banner
            dots={true}
            arrows={false}
            infinite={false}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            scrolled={this.state.scrolled}
            slidersData={this.props.newsList}
          />
          <NewsEvents/>
          <MainNewsSection/>
          <NewsVideoSection/>
          <MoreNews/>
          <Footer/>
        </div>
      </>
      
    )
  }
}
export default News;  