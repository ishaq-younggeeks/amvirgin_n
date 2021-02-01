import React, { Component, useContext,useRef  } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../Header';
import Footer from '../../Footer';  
import './style.css';
import Trending from '../../Home/components/Trending';
import Slider from "react-slick";
import ReadMoreReact from 'read-more-react';
import Video from './Video';
import {GetData} from '../../../../db.js';
import $ from 'jquery'
import {connect} from 'react-redux';
import {videoData,clearVideoData,trendingDetail} from './ShowAction'
import { dashboardData } from "../../Home/components/HomeAction";
import { Link } from 'react-router-dom';
// import ReactPlayer from './CreatePlayer'
import ReactPlayer from 'react-player'
import Controls from './Controls'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom' 
class Show extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            trending:[],
            vResponse:'360p',
            movieName:'',
            videoData:'',
            refresh:false,
            videoId:'',
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
           timeDisplayFormat:"normal"
        }
        this.episodeCredit = this.episodeCredit.bind(this);
        this.controlsRef = React.createRef();
        this.playerContainerRef = React.createRef();

    }
    resCallBack = (dd) => {
        this.setState({vResponse:dd});
    }
    componentDidMount(){

       // this.props.videoData( this.props.location.query)
        // this.props.trendingDetail();
        this.props.dashboardData()
        this.setState({refresh:true})
        
    
        window.scrollTo(0, 0)
        // GetData('customer/trending/picks').then(res=>{
        //     console.log("trending Data",res);
        //     this.setState({trending: res.data.data.trendingPicks});
        // }).catch(err=>console.log("error occur",err));
    }

    load = url => {
        this.setState({
          url,
          played: 0,
          loaded: 0,
          pip: false
        },console.log("current state",this.state))
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
        this.setState({seeking: false, volume: parseFloat(newValue / 100) });
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
    
      handleSeekChange = (e,newValue) => {
          console.log("value",newValue)
        this.setState({ played: parseFloat(newValue / 100) })
      }
    
      handleSeekMouseUp = (e, newValue) => {
        this.setState({ seeking: false })
        this.player.seekTo(newValue / 100, "fraction")
      }

    
      handleProgress = state => {
        // console.log('onProgress', state)
       const currentTime =
        this.player && this.player.current
         ? this.player.current.getCurrentTime()
         : "00:00";
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state)
        }
      }
    
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
        
        if (prevState.refresh !==this.state.refresh) { 
            console.log("updated video id ", this.props.location.query) 
            this.props.videoData()
            window.scrollTo(0, 0)
        }

        if(prevState.playVideo!==this.state.playVideo){

        }
    }

    componentWillUnmount(){
        this.props.clearVideoData()
        localStorage.setItem("videoId","")
    }

    episodeCredit = () =>{
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
          }));
    }

     handleMouseMove = () => {
        console.log("mousemove",this.controlsRef.current.style);
        this.controlsRef.current.style.visibility = "visible";
        // count = 0;
      };

       hanldeMouseLeave = () => {
        this.controlsRef.current.style.visibility = "hidden";
        this.controlsRef.current.style.opacity = 0;
        // count = 0;
      };
    

    onClickHandler =async (e,props,videoId) =>{
        console.log("event",e);
        console.log("props",props);
        console.log("videoId",videoId)
     props.videoData(videoId,props.history)
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

     currentTime =
     this.player && this.player.current
      ? this.player.current.getCurrentTime()
      : "00:00";

//    duration = () => this.player && this.player.current ? this.player.current.getDuration() : "00:00";
//    elapsedTime =
//     this.state.timeDisplayFormat == "normal"
//       ? this.format(this.currentTime)
//       : `-${this.format(this.duration - this.currentTime)}`;

//    totalDuration = this.format(this.duration);

    ref = player => {
        this.player = player
      }
   
    render(){
        var settings = {
            dots: false,
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 5.5,
            slidesToScroll: 1
          };

        //   window.scrollTo(0, 0)
        //   console.log("this props video detail",this.props.videoDetail)
        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
        return(
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
                                    {/* <img src="img/main1.jpg" alt="play" className="videoimage" /> */}
                                    {/* {this.props.videoDetail && this.props.videoDetail.sources? */}
                                        {/* // src={this.props.videoDetail.sources.video[0].url} */}
                                    <div
                                     className='VideoPlayer'
                                     onMouseMove={this.handleMouseMove}
                                     onMouseLeave = {this.hanldeMouseLeave}
                                     style = {{
                                         position:"relative",
                                         width:"100%"
                                     }}
                                    ref={this.playerContainerRef}
                                     >
                                    <ReactPlayer
                                      ref={this.ref}
                                      className='react-player'
                                      width='100%'
                                      height='100%'
                                      url={"https://amvirgin.citrixcrm.xyz/storage/videos/streams/XfAUGG0sEz4ep4NmJOkCXxcb/20_13.m3u8"}
                                      pip={pip}
                                      playing={playing}
                                      controls={controls}
                                    //   light={light}
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
                                    />
                                    {/* <ReactPlayer
                                    className="react-player"
                                    width="100%"
                                    height="100%"
                                    url={"https://amvirgin.citrixcrm.xyz/storage/videos/streams/XfAUGG0sEz4ep4NmJOkCXxcb/20_13.m3u8"}
                                    
                                    playbackRate ="1"
                                    config = {{
                                        file:{
                                            tracks: [
                                                {kind: 'subtitles', src: 'subs/subtitles.en.vtt', srcLang: 'en', default: true},
                                                {kind: 'subtitles', src: 'subs/subtitles.ja.vtt', srcLang: 'ja'},
                                                {kind: 'subtitles', src: 'subs/subtitles.de.vtt', srcLang: 'de'}
                                              ]
                                        }
                                    }}
                                    /> */}
                                     
                                     {/* <div ref={this.controlsRef} style={{visibility:this.controlsRef.current}} class="grid-container">
  <div class="grid-item"><button>dgdgd</button></div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>  
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>  
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>  
</div> */}
                                     {/* <Controls 
            ref={this.controlsRef}
            onPlay={this.handlePlay}
            playing={playing}
            onPause={this.handlePause}
          />  */}
           <Controls
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
            // elapsedTime={elapsedTime}
            totalDuration={this.totalDuration}
            onMute={this.hanldeMute}
            muted={muted}
            onVolumeChange={this.handleVolumeChange}
            onVolumeSeekDown={this.handleVolumeSeekDown}
            // onChangeDispayFormat={handleDisplayFormat}
            // playbackRate={playbackRate}
            // onPlaybackRateChange={handlePlaybackRate}
            onToggleFullScreen={this.toggleFullScreen}
            volume={volume}
            // onBookmark={addBookmark}
          />
                                  </div>
                                    {/* :""} */}
                                </div>
                                <button className="watchlist"><i className="fa fa-bars"></i>Watchlist</button>
                                <button className="watchlist"><i className="fa fa-share"></i>Share</button>
                            </div>
                            <div className="col-md-6">
                                <div className="imgslider">
                                    <div className="col-md-8">
                                        {this.props.videoDetail?
                                         (
                                        <>
                                          <h3>{this.props.videoDetail.title}</h3>
                                          <h6>{this.props.videoDetail.type} | 
                                              {this.props.videoDetail.duration} | 
                                              {this.props.videoDetail.genre} | 
                                              {this.props.videoDetail.pgRating} | 
                                              {this.props.videoDetail.cast}</h6>
                                         </>

                                        ):""}
                                        
                                        <button className="trailerbtn">
                                            <img src="img/playred.png" alt="play" className="play" />Trailer
                                        </button>
                                            <button className="playbtn" onClick={()=>this.handlePlayPause()}>
                                                <i className={playing?"fa fa-pause-circle":"fa fa-play-circle"}></i>{playing?"Pause":"Play"}
                                            </button>   
                                    </div>
                                    <hr className="videohr" />
                                    <div className="details row">
                                    {this.props.videoDetail?
                                    <p>{this.props.videoDetail.description}</p>:""}
                                    </div>
                                </div>
                            </div>
                        </div>	
                    </div>
                    { this.props.videoDetail.hasSeasons &&
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
                                {this.props.videoDetail.content && this.props.videoDetail.content.length && this.props.videoDetail.content.map((item,index)=>{
                                    return (
                                        <>
                                            {item.content.map((child,ind) => {
                                                return (
                                                    <>   
                                                        {child.options.map((opti,inde) => {
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
                                                        )})}
                                                    </>
                                            )})}
                                        </>
                                    )})} 
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
                    {!this.props.videoDetail.hasSeasons &&
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
                            {this.props.videoDetail.recommended && this.props.videoDetail.recommended.length && this.props.videoDetail.recommended.map((item,index)=>{
                            return (
                                <Link style={{width: '25%'}} onClick={(e) => this.onClickHandler(e,this.props,item.id)}>
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
                                    )})} 
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
    console.log("state Video data",state.ShowVideos.videoData)
    return  {
        videoDetail : state.ShowVideos.videoData,
        trendingData : state.Home.dashboardData
    }
  }
  const mapDispatchToProps = (dispatch) => {
  return({
       // addtoCart:(id) => dispatch(addtoCart(id)),
      //  getproduct:(id,hist) => dispatch(productDetail(id,hist)),
      videoData:(videoId) => dispatch(videoData(videoId)),
      clearVideoData:() => dispatch(clearVideoData()),
      trendingDetail:() => dispatch(trendingDetail()),
      dashboardData: () => dispatch(dashboardData()),
  });
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(Show);

//export default Show;