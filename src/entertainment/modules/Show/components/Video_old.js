import { Button } from 'bootstrap';
import React, { Component } from 'react';
import { Player, ControlBar, PosterImage, ClosedCaptionButton, ForwardControl, ReplayControl, BigPlayButton } from 'video-react';
import './style.css';
import VideoQualityButton from './videoQuality';

class Video extends Component {
    constructor(props){
        super(props);
        this.state = {
            source: this.props.src,
            videoRes:this.props.res,
            visible: false,
        }

        this.myref = React.createRef()
    }
    componentDidMount() {
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
        document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('keydown', this._handleOnKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('keydown', this._handleOnKeyPress);
    }
    // _handleContextMenu = (event) => {
    //     event.preventDefault();
    //     this.setState({ visible: this.state.visible });
    // }
    _handleOnKeyPress = (event) => {
        console.log("currentref",this.myref.current)
        this.props.play()
        // event = (event || window.event);
        //     if (event.keyCode === 123) {
        //         event.preventDefault();
        //         event.returnValue = false;
        //     }
    }
    handleStateChange(state) {
        this.setState({
            player: state
        });
    }
    play() {
        this.player.play();
    }
    pause() {
        this.player.pause();
    }
    onVideoFormat = (a) => {
        this.props.resCallBack(a);
        this.setState({videoRes:a})
    }

    componentDidUpdate = (prevProps,prevState) => {
        // console.log("clicked")
        // if(this.myref.current.state!==null){
        //     console.log("clicked")
        // }

    }
    render(){
        // console.log("videooooooooooooo",this.props)
        let poster = this.props.poster;
        return(
            <div className="videoArea">
                <Player
                    poster={poster}
                    ref={player => {
                        this.player = player;
                    }}
                    videoWidth={853}
                    videoHeight={480}
                    videoId="playerVideo1"
                    >
                    <BigPlayButton ref={this.myref} id="myBtn" position="center" onClick = {() =>{this.props.play()}}/>

                    <source src={this.state.source} type='video/mp4' res={this.state.videoRes} />
                    <track
                        kind="captions"
                        //src="/assets/elephantsdream/captions.en.vtt"
                        srcLang="en"
                        label="English"
                        default
                    />
                    <track
                        kind="captions"
                        //src="/assets/elephantsdream/captions.sv.vtt"
                        srcLang="sv"
                        label="Swedish"
                    />
                    <track
                        kind="captions"
                        //src="/assets/elephantsdream/captions.ru.vtt"
                        srcLang="ru"
                        label="Russian"
                    />
                    <ControlBar autoHide={true}>
                        <ReplayControl seconds={15} order={1.1} />
                        <ForwardControl seconds={15} order={1.2} />
                        <ClosedCaptionButton order={7} />
                        <VideoQualityButton onVideoFormat={this.onVideoFormat}  videoFormat = {this.state.videoRes} order={8} />
                    </ControlBar>
                </Player>
            </div>
        );
    }
}

export default Video;