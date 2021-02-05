import React, { Component, useContext, useRef } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../Header';
import Footer from '../../Footer';
import './style.css';
import Trending from '../../Home/components/Trending';
import Slider from "react-slick";
import ReadMoreReact from 'read-more-react';
import Video from './Video';
import { GetData } from '../../../../db.js';
import $ from 'jquery'
import { connect } from 'react-redux';
import { videoData, clearVideoData, trendingDetail } from './ShowAction'
import { dashboardData } from "../../Home/components/HomeAction";
import { Link } from 'react-router-dom';
// import ReactPlayer from './CreatePlayer'
import ReactPlayer from 'react-player'
import Controls from './Controls'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import { IconButton } from '@material-ui/core';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Duration from './Duration'
import {LivePlayer} from './videoPlayer'
class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      trending: [],
      vResponse: '360p',
      movieName: '',
      videoData: '',
      refresh: false,
      videoId: '',
      url: null,
      pip: false,
      playing: true,
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
      playIcon:true
    }
    this.episodeCredit = this.episodeCredit.bind(this);
    this.controlsRef = React.createRef();
    this.playerContainerRef = React.createRef();
    this.count = 0
 
  }
  resCallBack = (dd) => {
    this.setState({ vResponse: dd });
  }
  componentDidMount() {

    // this.props.videoData( this.props.location.query)
    // this.props.trendingDetail();
    this.props.dashboardData()
    this.setState({ refresh: true })


    window.scrollTo(0, 0)
    // GetData('customer/trending/picks').then(res=>{
    //     console.log("trending Data",res);
    //     this.setState({trending: res.data.data.trendingPicks});
    // }).catch(err=>console.log("error occur",err));
  }
  videoJsOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    controls: true,
    sources: [
      {
        src: 'https://amvirgin.citrixcrm.xyz/storage/videos/streams/XfAUGG0sEz4ep4NmJOkCXxcb/20_13.m3u8',
        type: 'application/x-mpegURL',
      },
    ],
  };

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    }, console.log("current state", this.state))
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleToggleLight = () => {
    this.setState({ light: !this.state.light })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = (e, newValue) => {
    this.setState({ volume: parseFloat(newValue / 100), muted: newValue === 0 ? true : false, })
  }

  handleVolumeSeekDown = (e, newValue) => {
    this.setState({ seeking: false, volume: parseFloat(newValue / 100) });
  };

  hanldeMute = () => {
    this.setState((prevState) => ({ muted: !prevState.muted }));
  };

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handleEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = (e, newValue) => {
    console.log("value", newValue)
    this.setState({ played: parseFloat(newValue / 100) })
  }

  handleSeekMouseUp = (e, newValue) => {
    this.setState({ seeking: false })
    this.player.seekTo(newValue / 100, "fraction")
  }


  handleProgress = state => {
    console.log('onProgress', this.count)
    if (this.count > 2) {
      this.controlsRef.current.style.visibility = "hidden";
      this.controlsRef.current.style.opacity = 0;
      this.count = 0;
    }
    if (this.controlsRef.current.style.visibility == "visible") {
      this.count += 1;
    }
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handlePlaybackRate = (rate) => {
    this.setState({ playbackRate: rate });
  };

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }

  toggleFullScreen = () => {
    screenfull.toggle(this.playerContainerRef.current);
  };

  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.refresh !== this.state.refresh) {
      console.log("updated video id ", this.props.location.query)
      this.props.videoData()
      window.scrollTo(0, 0)
    }

    if (prevState.playVideo !== this.state.playVideo) {

    }
  }

  componentWillUnmount() {
    this.props.clearVideoData()
    localStorage.setItem("videoId", "")
  }

  episodeCredit = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleMouseMove = () => {
    console.log("mousemove", this.controlsRef.current.style);
    if(!this.state.playIcon){
    this.controlsRef.current.style.visibility = "visible";
    this.controlsRef.current.style.opacity = 1;
    this.count = 0;
    }
  };

  hanldeMouseLeave = () => {
    this.controlsRef.current.style.visibility = "hidden";
    this.controlsRef.current.style.opacity = 0;
    this.count = 0;
  };


  onClickHandler = async (e, props, videoId) => {
    console.log("event", e);
    console.log("props", props);
    console.log("videoId", videoId)
    props.videoData(videoId, props.history)
  }

  format = (seconds) => {
    if (isNaN(seconds)) {
      return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  ref = player => {
    this.player = player
  }

  render() {
    var settings = {
      dots: false,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5.5,
      slidesToScroll: 1
    };
    const { videoDetail } = this.props
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
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
                  {/* <VideoPlayer {...this.videoJsOptions }/> */}
                  <LivePlayer {...videoDetail}/>
                {videoDetail && videoDetail.sources?
                 (<div
                      className='VideoPlayer'
                      // onMouseMove={this.handleMouseMove}
                      // onMouseLeave={this.hanldeMouseLeave}
                      style={{
                        position: "relative",
                        width: "100%"
                      }}
                      ref={this.playerContainerRef}
                    >
                      
                      {/* <ReactPlayer
                        ref={this.ref}
                        className='react-player'
                        width='100%'
                        height='100%'
                        url={videoDetail.sources.video[0].url}
                        pip={pip}
                        playing={playing}
                        controls={controls}
                        light={videoDetail.poster }
                        playIcon={<IconButton onClick={()=>{this.setState((prevState)=>({playIcon:!prevState.playIcon}))}}><PlayArrowIcon fontSize="inherit" /></IconButton>}
                        loop={loop}
                        playbackRate={playbackRate}
                        volume={volume}
                        muted={muted}
                        onReady={() => console.log('onReady')}
                        onStart={() => console.log('onStart')}
                        onPlay={this.handlePlay}
                        onEnablePIP={this.handleEnablePIP}
                        onDisablePIP={this.handleDisablePIP}
                        onPause={this.handlePause}
                        onBuffer={() => console.log('onBuffer')}
                        //   onSeek={e => console.log('onSeek', e)}
                        onEnded={this.handleEnded}
                        onError={e => console.log('onError', e)}
                        onProgress={this.handleProgress}
                        onDuration={this.handleDuration}
                      /> */}
                      {/* <Controls
                        ref={this.controlsRef}
                        onPlay={this.handlePlay}
                        onPause={this.handlePause}
                        onSeek={this.handleSeekChange}
                        onSeekMouseDown={this.handleSeekMouseDown}
                        onSeekMouseUp={this.handleSeekMouseUp}
                        onDuration={this.handleDuration}
                        // onRewind={this.handleRewind}
                        onPlayPause={this.handlePlayPause}
                        // onFastForward={this.handleFastForward}
                        playing={playing}
                        played={played}
                        elapsedTime={<Duration seconds={duration * played} />}
                        totalDuration={<Duration seconds={duration} />}
                        title={videoDetail.title}
                        onMute={this.hanldeMute}
                        muted={muted}
                        onVolumeChange={this.handleVolumeChange}
                        onVolumeSeekDown={this.handleVolumeSeekDown}
                        // onChangeDispayFormat={handleDisplayFormat}
                        playbackRate={playbackRate}
                        onPlaybackRateChange={this.handlePlaybackRate}
                        onToggleFullScreen={this.toggleFullScreen}
                        volume={volume}
                      // onBookmark={addBookmark}
                      /> */}
                    </div>) : ""}
                  {/* :""} */}
                </div>
                <button className="watchlist"><i className="fa fa-bars"></i>Watchlist</button>
                <button className="watchlist"><i className="fa fa-share"></i>Share</button>
              </div>
              <div className="col-md-6">
                <div className="imgslider">
                  <div className="col-md-8">
                    {videoDetail ?
                      (
                        <>
                          <h3>{videoDetail.title}</h3>
                          <h6>{videoDetail.type} |
                                              {videoDetail.duration} |
                                              {videoDetail.genre} |
                                              {videoDetail.pgRating} |
                                              {videoDetail.cast}</h6>
                        </>

                      ) : ""}

                    <button className="trailerbtn">
                      <img src="img/playred.png" alt="play" className="play" />Trailer
                                        </button>
                    <button className="playbtn" onClick={() => this.handlePlayPause()}>
                      <i className={playing ? "fa fa-pause-circle" : "fa fa-play-circle"}></i>{playing ? "Pause" : "Play"}
                    </button>
                  </div>
                  <hr className="videohr" />
                  <div className="details row">
                    {videoDetail ?
                      <p>{videoDetail.description}</p> : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {videoDetail.hasSeasons &&
            <div className="container episodesection section2">
              <div className="tab">
                <button className={!this.state.isOpen ? 'tablinks episodebtn active' : 'tablinks episodebtn'} onClick={this.episodeCredit} id="defaultOpen">
                  <h5 className="">Episodes</h5>
                </button>
                <button className={this.state.isOpen ? 'tablinks episodebtn active' : 'tablinks episodebtn'} onClick={this.episodeCredit}>
                  <h5 className="">Credits</h5>
                </button>
              </div>
              {
                <div id="episode" className="tabcontent container">
                  <div className="sliderepisode">
                    <Slider {...settings}>
                      {videoDetail.content && videoDetail.content.length && videoDetail.content.map((item, index) => {
                        return (
                          <>
                            {item.content.map((child, ind) => {
                              return (
                                <>
                                  {child.options.map((opti, inde) => {
                                    return (
                                      <div className="container1">
                                        <img src={opti.url} className="image" alt="" />
                                        <div className="middle">
                                          <div className="imgslider"><img src={opti.url} alt="play" /></div>
                                        </div>
                                        <div className="infomovie">
                                          <h3>{opti.language}</h3>
                                          <h5>{opti.language}</h5>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              )
                            })}
                          </>
                        )
                      })}
                    </Slider>
                  </div>
                </div>
              }

              {this.state.isOpen &&
                <div id="credit" className="tabcontent credits">
                  <p>Actors: Mona Singh, Sakshi Tanwar, Nidhi Singh, Palomi Ghosh, Ashish Vidyarthy, Mohan Joshi </p>
                  <p>Director: Vinay Waikul</p>
                  <p>Duration: 2 hours 26 mins </p>
                </div>
              }

            </div>
          }
          {!videoDetail.hasSeasons &&
            <div className="container episodesection section2">
              <div className="tab">
                <button className={!this.state.isOpen ? 'tablinks episodebtn active' : 'tablinks episodebtn'} onClick={this.episodeCredit} id="defaultOpen">
                  <h5 className="">Movies</h5>
                </button>
                <button className={this.state.isOpen ? 'tablinks episodebtn active' : 'tablinks episodebtn'} onClick={this.episodeCredit}>
                  <h5 className="">Credits</h5>
                </button>
              </div>

              <div id="episode" className="tabcontent container">
                <div className="sliderepisode">
                  <Slider {...settings}>
                    {videoDetail.recommended && videoDetail.recommended.length && videoDetail.recommended.map((item, index) => {
                      return (
                        <Link style={{ width: '25%' }} onClick={(e) => this.onClickHandler(e, this.props, item.id)}>
                          <div>
                            <div className="container1">
                              <img src={item.poster} className="image" alt="" />
                              <div className="middle">
                                <div className="imgslider"><img src="img/play.png" alt="play" /></div>
                              </div>
                            </div>
                            <div className="infomovie">
                              <h3>{item.title}</h3>
                              <h5>{item.duration}</h5>
                            </div>
                          </div>

                        </Link>
                      )
                    })}
                  </Slider>
                </div>
              </div>




              {this.state.isOpen &&
                <div id="credit" className="tabcontent credits">
                  <p>Actors: Mona Singh, Sakshi Tanwar, Nidhi Singh, Palomi Ghosh, Ashish Vidyarthy, Mohan Joshi </p>
                  <p>Director: Vinay Waikul</p>
                  <p>Duration: 2 hours 26 mins </p>
                </div>
              }

            </div>
          }
          {this.props.trendingData && this.props.trendingData.payload && this.props.trendingData.payload.length &&
            <Trending
              dots={false}
              arrows={true}
              infinite={false}
              speed={500}
              slidesToShow={2.2}
              slidesToScroll={1}
              trendingData={this.props.trendingData.payload}
            />
          }
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state Video data", state.ShowVideos.videoData)
  return {
    videoDetail: state.ShowVideos.videoData,
    trendingData: state.Home.dashboardData
  }
}
const mapDispatchToProps = (dispatch) => {
  return ({
    // addtoCart:(id) => dispatch(addtoCart(id)),
    //  getproduct:(id,hist) => dispatch(productDetail(id,hist)),
    videoData: (videoId) => dispatch(videoData(videoId)),
    clearVideoData: () => dispatch(clearVideoData()),
    trendingDetail: () => dispatch(trendingDetail()),
    dashboardData: () => dispatch(dashboardData()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);

//export default Show;