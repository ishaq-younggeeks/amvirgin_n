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
           loop: false
        }
        this.episodeCredit = this.episodeCredit.bind(this);
        this.controlsRef = React.createRef();

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

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
      }

      handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
      }

      handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
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
        console.log("mousemove");
        this.controlsRef.current.style.visibility = "visible";
        // count = 0;
      };

       hanldeMouseLeave = () => {
        this.controlsRef.current.style.visibility = "hidden";
        // count = 0;
      };
    

    onClickHandler =async (e,props,videoId) =>{
        console.log("event",e);
        console.log("props",props);
        console.log("videoId",videoId)
     props.videoData(videoId,props.history)
    } 

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

          window.scrollTo(0, 0)
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
                                     className='player-wrapper'
                                     onMouseMove={this.handleMouseMove}
                                     onMouseLeave = {this.hanldeMouseLeave}
                                     style = {{
                                         position:"relative",
                                         width:"100%"
                                     }}
                                     >
                                    {/* <ReactPlayer
                                      ref={this.ref}
                                      className='react-player'
                                      width='100%'
                                      height='100%'
                                      url={"https://amvirgin.citrixcrm.xyz/storage/videos/streams/XfAUGG0sEz4ep4NmJOkCXxcb/20_13.m3u8"}
                                      pip={pip}
                                      playing={playing}
                                      controls={controls}
                                      light={light}
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
                                      onSeek={e => console.log('onSeek', e)}
                                      onEnded={this.handleEnded}
                                      onError={e => console.log('onError', e)}
                                      onProgress={this.handleProgress}
                                      onDuration={this.handleDuration}
                                    /> */}
                                    <ReactPlayer url="https://amvirgin.citrixcrm.xyz/storage/videos/streams/XfAUGG0sEz4ep4NmJOkCXxcb/20_13.m3u8"/>
                                
                                    <Controls
            ref={this.controlsRef}
            onPlay={this.handlePlay}
            playing={playing}
            onPause={this.handlePause}
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