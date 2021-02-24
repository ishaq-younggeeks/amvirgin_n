import React, { Component, useContext, useRef } from "react";
import { Helmet } from "react-helmet";
import Header from "../../Header";
import Footer from "../../Footer";
import "./style.css";
import Trending from "../../Home/components/Trending";
import Slider from "react-slick";

import $ from "jquery";
import { connect } from "react-redux";
import {
  videoData,
  clearVideoData,
  trendingDetail,
  allRentedVideos,
} from "./ShowAction";
import { dashboardData } from "../../Home/components/HomeAction";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { LivePlayer } from "./videoPlayer";
class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      trending: [],
      vResponse: "360p",
      movieName: "",
      videoData: "",
      refresh: false,
      videoId: "",
      url: null,
      pip: false,
      playing: false,
      controls: false,
      light: true,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      timeDisplayFormat: "normal",
      playIcon: true,
      setPlayer: false,
    };
    this.episodeCredit = this.episodeCredit.bind(this);
    this.controlsRef = React.createRef();
    this.playerRef = React.createRef();
  }
  resCallBack = (dd) => {
    this.setState({ vResponse: dd });
  };
  componentDidMount() {
    const params = this.props.match.params.videoId;
    this.props.videoData(params);
    this.props.trendingDetail();
    // this.props.dashboardData()
    this.setState({ refresh: true });
    console.log("this.props", this.props);
    this.setState({ url: window.location.href });

    this.props.allRentedVideosfnc();

    window.scrollTo(0, 0);
    // GetData('customer/trending/picks').then(res=>{
    //     console.log("trending Data",res);
    //     this.setState({trending: res.data.data.trendingPicks});
    // }).catch(err=>console.log("error occur",err));
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.videoDetail !== this.props.videoDetail) {
      window.scrollTo(0, 0);
      this.setState({ url: window.location.href });
      this.setState({ setPlayer: false });
    }
  };

  load = (url) => {
    this.setState(
      {
        url,
        played: 0,
        loaded: 0,
        pip: false,
      },
      console.log("current state", this.state)
    );
  };

  handleBuyOnRent = () => {
    const { loggedIn, user } = this.props.auth;
  };

  handlePlayPause = (bigPlay) => {
    const { loggedIn, user } = this.props.auth;
    if (loggedIn) {
      const { subscription } = user;
      if (subscription.active) {
        this.setState({ setPlayer: true });
        console.log("bigplay", this.props);
        if (bigPlay === undefined) {
          // this.playerRef.current.playPause()
        }
        this.setState({ playing: !this.state.playing });
      }
    } else {
      this.props.history.push("/subscription");
    }
  };

  componentWillUnmount() {
    this.props.clearVideoData();
  }

  episodeCredit = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  onClickHandler = async (e, props, videoId) => {
    console.log("event", e);
    console.log("props", props);
    console.log("videoId", videoId);
    props.videoData(videoId, props.history);
  };

  render() {
    var settings = {
      dots: false,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5.5,
      slidesToScroll: 1,
    };
    const { videoDetail, trendingData, allRentedVideos, auth } = this.props;
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
    } = this.state;
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Amvirgin | Show</title>
        </Helmet>
        <Header />
        <div className="bodysection">
          <div className="videomainsection container">
            <div className="row">
              <div className="col-md-6">
                <div>
                  {this.state.setPlayer ? (
                    <LivePlayer
                      src={videoDetail.sources.video[0].url}
                      videoDetail={videoDetail}
                      ref={this.playerRef}
                      handlePlayPause={this.handlePlayPause}
                    />
                  ) : (
                    <img
                      src={
                        videoDetail.poster ||
                        process.env.PUBLIC_URL + "/img/logo.png"
                      }
                      style={{
                        width: "100%",
                        maxHeight: "300px",
                      }}
                    />
                  )}
                </div>
                <button className="watchlist">
                  <i className="fa fa-bars"></i>Watchlist
                </button>

                <CopyToClipboard
                  text={window.location.href}
                  onCopy={() => {
                    this.setState({ copied: true });
                    setTimeout(() => {
                      this.setState({ copied: false });
                    }, 1500);
                  }}
                >
                  <button className="watchlist">
                    <i className="fa fa-share"></i>
                    Share
                  </button>
                </CopyToClipboard>

                {this.state.copied ? (
                  <span
                    style={{
                      color: "white",
                      margin: "5px",
                      padding: "5px",
                      background: "green",
                      borderRadius: "5px",
                    }}
                  >
                    url Copied.
                  </span>
                ) : null}
              </div>
              <div className="col-md-6">
                <div className="imgslider">
                  <div className="col-md-12">
                    {videoDetail ? (
                      <>
                        <div className="row">
                          <h3>{videoDetail.title}</h3>
                        </div>
                        <div>
                          <h6>
                            {videoDetail.type} |{videoDetail.duration} |
                            {videoDetail.genre} |{videoDetail.pgRating} |
                            {videoDetail.cast}
                          </h6>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    <div className="row">
                      <button className="trailerbtn">
                        <img
                          src={process.env.PUBLIC_URL + `/img/playred.png`}
                          alt="play"
                          className="play"
                        />
                        Trailer
                      </button>
                      <button
                        className="playbtn"
                        onClick={() => this.handlePlayPause()}
                      >
                        <i
                          className={
                            playing ? "fa fa-pause-circle" : "fa fa-play-circle"
                          }
                        ></i>
                        {playing ? "Pause" : "Play"}
                      </button>
                      {videoDetail.subscriptionType === "paid" ? (
                        allRentedVideos.findIndex(
                          (item) =>
                            item.video.id ===
                            parseInt(this.props.match.params.videoId)
                        ) !== -1 ? (
                          ""
                        ) : (
                          <Link to="/video/rentalpayment">
                            <button
                              className="playbtn"
                              style={{ marginLeft: "10px" }}
                              onClick={() => this.handleBuyOnRent()}
                            >
                              {`Rent @ Rs. ${videoDetail.price}`}
                            </button>
                          </Link>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <hr className="videohr" />
                  <div className="details row">
                    {videoDetail ? <p>{videoDetail.description}</p> : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {videoDetail.type === "series" && (
            <div className="container episodesection section2">
              <div className="tab">
                <button
                  className={
                    !this.state.isOpen
                      ? "tablinks episodebtn active"
                      : "tablinks episodebtn"
                  }
                  onClick={this.episodeCredit}
                  id="defaultOpen"
                >
                  <h5 className="">Episodes</h5>
                </button>
                <button
                  className={
                    this.state.isOpen
                      ? "tablinks episodebtn active"
                      : "tablinks episodebtn"
                  }
                  onClick={this.episodeCredit}
                >
                  <h5 className="">Credits</h5>
                </button>
              </div>
              {
                <div id="episode" className="tabcontent container">
                  <div className="sliderepisode">
                    <Slider {...settings}>
                      {videoDetail.episodes &&
                        videoDetail.episodes.length &&
                        videoDetail.episodes.map((item, index) => {
                          return (
                            <>
                              <div className="container1">
                                <img src={item.url} className="image" alt="" />
                                <div className="middle">
                                  <div className="imgslider">
                                    <img
                                      src={
                                        process.env.PUBLIC_URL + "/img/play.png"
                                      }
                                      alt="play"
                                    />
                                  </div>
                                </div>
                                <div className="infomovie">
                                  <h3>{item.season}</h3>
                                  <h5>{item.episode}</h5>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </Slider>
                  </div>
                </div>
              }

              {this.state.isOpen && (
                <div id="credit" className="tabcontent credits">
                  <p>
                    Actors: Mona Singh, Sakshi Tanwar, Nidhi Singh, Palomi
                    Ghosh, Ashish Vidyarthy, Mohan Joshi{" "}
                  </p>
                  <p>Director: Vinay Waikul</p>
                  <p>{videoDetail.duration} </p>
                </div>
              )}
            </div>
          )}
          {videoDetail.type === "movie" && (
            <div className="container episodesection section2">
              <div className="tab">
                {/* <button
                  className={
                    !this.state.isOpen
                      ? "tablinks episodebtn active"
                      : "tablinks episodebtn"
                  }
                  onClick={this.episodeCredit}
                  id="defaultOpen"
                >
                  <h5 className="">Movies</h5>
                </button> */}
                <button
                  className={
                    this.state.isOpen
                      ? "tablinks episodebtn active"
                      : "tablinks episodebtn"
                  }
                  onClick={this.episodeCredit}
                >
                  <h5 className="">Credits</h5>
                </button>
              </div>

              <div id="episode" className="tabcontent container">
                <div className="sliderepisode">
                  <Slider {...settings}>
                    {videoDetail.recommended &&
                      videoDetail.recommended.length &&
                      videoDetail.recommended.map((item, index) => {
                        return (
                          <Link
                            style={{ width: "25%" }}
                            onClick={(e) =>
                              this.onClickHandler(e, this.props, item.id)
                            }
                          >
                            <div>
                              <div className="container1">
                                <img
                                  src={item.poster}
                                  className="image"
                                  alt=""
                                />
                                <div className="middle">
                                  <div className="imgslider">
                                    <img
                                      src={
                                        process.env.PUBLIC_URL + "/img/play.png"
                                      }
                                      alt="play"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="infomovie">
                                <h3>{item.title}</h3>
                                <h5>{item.duration}</h5>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                  </Slider>
                </div>
              </div>

              {(
                <div id="credit" className="tabcontent credits">
                  <p>
                    Actors: Mona Singh, Sakshi Tanwar, Nidhi Singh, Palomi
                    Ghosh, Ashish Vidyarthy, Mohan Joshi{" "}
                  </p>
                  <p>Director: Vinay Waikul</p>
                  <p>Duration: {videoDetail.duration} </p>
                </div>
              )}
            </div>
          )}
          {trendingData && trendingData.length && (
            <Trending
              dots={false}
              arrows={true}
              infinite={false}
              speed={500}
              slidesToShow={2.2}
              slidesToScroll={1}
              trendingData={trendingData}
            />
          )}
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state Video data", state.ShowVideos.trendingData);
  return {
    videoDetail: state.ShowVideos.videoData,
    trendingData: state.ShowVideos.trendingData,
    auth: state.authReducer,
    allRentedVideos: state.ShowVideos.allRentedVideos,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // addtoCart:(id) => dispatch(addtoCart(id)),
    //  getproduct:(id,hist) => dispatch(productDetail(id,hist)),
    videoData: (videoId) => dispatch(videoData(videoId)),
    clearVideoData: () => dispatch(clearVideoData()),
    trendingDetail: () => dispatch(trendingDetail()),
    dashboardData: () => dispatch(dashboardData()),
    allRentedVideosfnc: () => dispatch(allRentedVideos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
