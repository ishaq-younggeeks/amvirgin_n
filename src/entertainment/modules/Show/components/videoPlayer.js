import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
// those imports are important
import qualitySelector from 'videojs-hls-quality-selector';
import qualityLevels from 'videojs-contrib-quality-levels'
import { PlaylistPlayRounded } from '@material-ui/icons';

export const LivePlayer = forwardRef(({videoDetail,src,handlePlayPause}, ref) => {

  const videoRef = useRef()
  const [player, setPlayer] = useState(undefined)
  const [source,setSrc] = useState(null)
  const {sources,poster} = videoDetail


  useEffect(() => {
    (async ()=>{
      setSrc(src)
    })()
    
    return () => {
      if (player) player.dispose()
    };
  }, [])




  useEffect(() => {

    if (player) {
      player.addRemoteTextTrack({
        id: 'my-auddfdfio-track',
        kind: 'captions',
        language: 'fr',
        label: 'French',
        Mode: 'showing',
        src: 'https://solutions.brightcove.com/bcls/captions/adding_captions_to_videos_french.vtt'
      });

      // Get the current player's AudioTrackList object.
      var audioTrackList = player.audioTracks();
      audioTrackList.addEventListener('change', function () {
        console.log("calling audio tracklist")
        // Log the currently enabled AudioTrack label.
      });

      console.log("current player", player)
      // player.on('play', () => {
      //   // console.log("playing")
      //   // callActiveTrack();
      //   handlePlayPause("play")
      // });

      // player.on('pause',() => {
      //   handlePlayPause("pause")
      // })
    }


  }, [player])

  useEffect(() => {


    if(source){
    const videoJsOptions = {
      autoplay: true,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      controls: true,
      fluid: true,
      muted: false,
      responsive: true,
      aspectRatio:'16:9',
      // sources: [{
      //   // src: '	https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      //   // src: "https://amvirgin.citrixcrm.xyz/storage/videos/streams/XfAUGG0sEz4ep4NmJOkCXxcb/20_13.m3u8",
      //   src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
      //   type: "application/x-mpegURL"
      // }],
      sources:[{src:source,type:"application/x-mpegURL"}],
      preload:"none",
      userActions: {
        hotkeys: function (event) {
          // `this` is the player in this context

          // `x` key = pause
          if (event.which === 88) {
            this.pause();
          }
          // `y` key = play
          if (event.which === 89) {
            this.play();
          }
          else {
            console.log("hot keys", event.which)
          }
        }
      },
      tracks: [
        {
          id: 'my-spanish',
          kind: 'captions',
          label: 'Spanish es',
          language: 'es',
          Mode: 'showing',
          srclang: 'en',
          src: "https://thepaciellogroup.github.io/AT-browser-tests/video/subtitles-en.vtt"
        },
        {
          id: 'my-sdk',
          kind: 'subtitles',
          label: 'Spanish',
          language: 'en',
          Mode: 'showing',
          srclang: 'end',
          src: "https://thepaciellogroup.github.io/AT-browser-tests/video/subtitles-en.vtt"
        }
      ],
      textTrackSettings: true,
      plugins: {
        hlsQualitySelector: {
          displayCurrentQuality: true
        }
      },
      html5: {
        // hls: {
        //   enableLowInitialPlaylist: true,
        //   smoothQualityChange: true,
        //   overrideNative: true,
        // },
        // vhs: {
        //   overrideNative: true
        // },
        // nativeAudioTracks: false,
        // nativeVideoTracks: false
      }

    }

    // Create a track object.


    // videojs.registerPlugin('hlsQualitySelector', qualitySelector)

 

    const p = videojs(videoRef.current, videoJsOptions, function onPlayerReady() {

      console.log('onPlayerReady')
    })
    // Add the track to the player's audio track list.
    setPlayer(p)
  }
    
  }, [source]);

  // useEffect(() => {
  //   console.log("update call",src)
  //   if(player){

  //     if(!player.paused()){
  //       player.paused()
  //     }
  //     setSrc(src)
  //     player.src({ src:source, type:"application/x-mpegURL" });
  //     player.load()
  //     player.play()
  //   }
  // },[source,videoDetail])


  const callActiveTrack = () => {
    var usersAudioTrackList = [{
      id: 'vjs_track_my-1',
      kind: 'alternative',
      label: 'big pop 3',
      language: 'eng',
      enabled: false,
      audio: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/alternate_audio_aac_sinewave/main.aac',
    },

    {
      id: 'vjs_track_my-2',
      kind: 'default',
      label: 'en',
      language: 'es',
      audio: "https://amvirgin.citrixcrm.xyz/storage/videos/audio_tracks/XtyqTtlh1EqDZ2FkFPmpVOsXVEy4w9jXmkhH4XgY.mp3"
      ,
    },

    {
      id: 'vjs_track_my-3',
      kind: 'alternative',
      label: 'marathi',
      language: 'en',
      audio: "https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/camera_flashing_2.mp3"
      ,
    }];

    usersAudioTrackList.map((audio) => {
      var track = new videojs.AudioTrack(audio);
      player.audioTracks().addTrack(track);
    })
  }


  useImperativeHandle(
    ref,
    () => ({
      playPause() {
      if (player.paused()) {
          player.play();
          // player.requestFullscreen()
        } else {
          player.pause();
        }

      }
    }),
  )

  return (
    <>
      <div data-vjs-player onContextMenu={(e)=>e.preventDefault()}>
        <video ref={videoRef} className="video-js"></video>
      </div>
    </>
  );
});