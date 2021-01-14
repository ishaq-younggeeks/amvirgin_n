import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Header from "../../Header";
import Footer from "../../Footer";
import Sliders from "./Slider";
import EntertainmentSection from "./EntertainmentSection";
import Shop from "./Shop";
import Trending from "./Trending";
import { GetData } from "../../../../db";
import { connect } from "react-redux";
import { dashboardData } from "./HomeAction";

class Home extends Component {
  state = {
    scrolled: true,
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    //Get data for Top sliders
    this.props.dashboardData();

    //for session storage

    // if (localStorage.getItem("session")) {
    //   GetData(`customer/sessions/${localStorage.getItem("session")}`).then(res => {
    //   })
    // } else {
    //   GetData("customer/sessions/start").then(res => {
    //     localStorage.setItem('session', res.data.session)
    //   })
    // }
  };
  render() {
    const { dashboardDetail } = this.props;
    console.log("DashboardDetails :", dashboardDetail)
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Amvirgin | Home</title>
        </Helmet>
        <Header scrolled={this.state.scrolled} />
        <div className="bodysection">
          {dashboardDetail ? (
            <>
              <Sliders
                dots={true}
                arrows={false}
                infinite={false}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                slidersData={dashboardDetail.sliders}
              />
              {dashboardDetail.products && dashboardDetail.products.length ? (
                <Shop
                  dots={false}
                  arrows={true}
                  infinite={false}
                  speed={500}
                  responsive={[
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                      },
                    },
                  ]}
                  slidesToShow={5.5}
                  slidesToScroll={1}
                  shopData={dashboardDetail.products}
                />
              ) : (
                ""
              )}
              {dashboardDetail.sections && dashboardDetail.sections.length
                ? dashboardDetail.sections.map((data, index) => {
                    return (
                      <EntertainmentSection
                        key={data.id}
                        dots={false}
                        arrows={true}
                        infinite={false}
                        speed={500}
                        responsive={[
                          {
                            breakpoint: 600,
                            settings: {
                              slidesToShow: 2.5,
                              slidesToScroll: 1,
                            },
                          },
                        ]}
                        slidesToShow={5.5}
                        slidesToScroll={1}
                        sectionData={data}
                        {...this.props}
                      />
                    );
                  })
                : ""}
              {dashboardDetail.payload.length ? (
                <Trending
                  dots={false}
                  arrows={true}
                  infinite={false}
                  speed={500}
                  slidesToShow={2.2}
                  slidesToScroll={1}
                  trendingData={dashboardDetail.payload}
                  {...this.props}
                />
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dashboardDetail: state.Home.dashboardData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // addtoCart:(id) => dispatch(addtoCart(id)),
    //  getproduct:(id,hist) => dispatch(productDetail(id,hist)),
    dashboardData: () => dispatch(dashboardData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
