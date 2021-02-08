import React, { useRef, useState, useEffect } from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
// those imports are important
import qualitySelector from 'videojs-hls-quality-selector';
import qualityLevels from 'videojs-contrib-quality-levels'

export const LivePlayer = ({sources }) => {

    const videoRef = useRef()
    const [player, setPlayer] = useState(undefined)

    useEffect(() => {
        const videoJsOptions = {
            autoplay: false,
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            controls: true,
            fluid: true,
            muted: false,
            responsive: true,
            sources: [{
                // src: '	https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
                src:"https://amvirgin.citrixcrm.xyz/storage/videos/streams/XfAUGG0sEz4ep4NmJOkCXxcb/20_13.m3u8",
                type:"application/x-mpegURL"
            }],
            userActions: {
                hotkeys: function(event) {
                  // `this` is the player in this context
            
                  // `x` key = pause
                  if (event.which === 88) {
                    this.pause();
                  }
                  // `y` key = play
                  if (event.which === 89) {
                    this.play();
                  }
                }
              },
            tracks:[
                {
                    id: 'my-spanish',
                    kind: 'captions',
                    label: 'Spanish es',
                    language: 'es',
                    Mode:'showing',
                    srclang:'en',
                    src:"https://thepaciellogroup.github.io/AT-browser-tests/video/subtitles-en.vtt"
                  },
                  {
                    id: 'my-sdk',
                    kind: 'subtitles',
                    label: 'Spanish',
                    language: 'en',
                    Mode:'showing',
                    srclang:'end',
                    src:"https://thepaciellogroup.github.io/AT-browser-tests/video/subtitles-en.vtt"
                  }
            ],
            textTrackSettings:true,
            plugins:{
                hlsQualitySelector:{
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
        var track = new videojs.AudioTrack( {
            id: 'my-2',
            kind: 'translation',
            label: 'en',
            language: 'es',
            audio:"https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/camera_flashing_2.mp3"
            ,
          });
          
          // Add the track to the player's audio track list.
          p.audioTracks().addTrack(track);
        setPlayer(p)
        return () => {
            if (player) player.dispose()
        };
    }, [])

    useEffect(() => {

        if (player)
        {
            
        //    console.log("ptg",p)
            // player.hlsQualitySelector({ displayCurrentQuality: true })
            player.addTextTrack("captions","mysd","en")
           
            player.addRemoteTextTrack({
                id: 'my-auddfdfio-track',
                kind: 'captions',
                language: 'fr',
                label: 'French',
                Mode:'showing',
                src: 'https://solutions.brightcove.com/bcls/captions/adding_captions_to_videos_french.vtt'
              });

            // Get the current player's AudioTrackList object.
var audioTrackList = player.audioTracks();
audioTrackList.addEventListener('change', function() {
console.log("calling audio tracklist")
    // Log the currently enabled AudioTrack label.
    for (var i = 0; i < audioTrackList.length; i++) {
      var track = audioTrackList[i];
  console.log("current audio track list",audioTrackList[0].kind)
      if (track.enabled) {
        videojs.log(track.label);
        // dispatchEvent()
        // dispatchEvent( track.enabledChange_.guid)
        // EventTarget.trigger()
        //   console.log("player audio",track.enabledChange_.guid)
        // // videojs.log(t);
        var audio = document.getElementById('audio');
        let t = player.currentTime()
          var source = document.getElementById('audioSource');
          source.src = `https://amvirgin.citrixcrm.xyz/storage/videos/audio_tracks/XtyqTtlh1EqDZ2FkFPmpVOsXVEy4w9jXmkhH4XgY.mp3#t=${t}`
        
          audio.load(); //call this to just preload the audio without playing
          audio.play(); //call this to play the song right away
        return;
      }
    }
  });
  player.bigPlayButton.on('click', function(){
    callActiveTrack()
});
            
        } 
    }, [player])


    const callActiveTrack = () => {
        var usersAudioTrackList = [{
            id: 'vjs_track_my-1',
            kind: 'alternative',
            label: 'big pop 3',
            language: 'eng',
            enabled: false,
            audio:'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/alternate_audio_aac_sinewave/main.aac',
          },
          
          {
            id: 'vjs_track_my-2',
            kind: 'default',
            label: 'en',
            language: 'es',
            audio:"https://amvirgin.citrixcrm.xyz/storage/videos/audio_tracks/XtyqTtlh1EqDZ2FkFPmpVOsXVEy4w9jXmkhH4XgY.mp3"
            ,
          },
          
          {
            id: 'vjs_track_my-3',
            kind: 'alternative',
            label: 'marathi',
            language: 'en',
            audio:"https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/camera_flashing_2.mp3"
            ,
          }];

          usersAudioTrackList.map((audio) => {
            var track = new videojs.AudioTrack(audio);
            player.audioTracks().addTrack(track);
          })



          
    }


    return (
        <>
        <div data-vjs-player>
                <video ref={videoRef} className="video-js"></video>
        </div>
        <button id="my-audio-track" onClick={callActiveTrack    }> click me</button>
        <ul style={{listStyle: "none"}}>
  <li>Audio Files
    <ul id="list">
      <li onCLick= {(e)=>{
       
          e.preventDefault();
        
          var elm = e.target;
          var audio = document.getElementById('audio');
        
          var source = document.getElementById('audioSource');
          source.src = elm.getAttribute('data-value');
        
          audio.load(); //call this to just preload the audio without playing
          audio.play(); //call this to play the song right away

      }}><a href="#" data-value="http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.oga">Death_Becomes_Fur.oga</a></li>
      <li><a href="#" data-value="http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4">Death_Becomes_Fur.mp4</a></li>
      <li><a href="#" data-value="http://media.w3.org/2010/11/rrs006.oga">rrs006.oga</a></li>
      <li><a href="#" data-value="http://media.w3.org/2010/05/sound/sound_90.mp3">sound_90.mp3</a></li>
    </ul>
  </li>
</ul>

<audio id="audio" controls="controls" style={{display:"block"}}>
  <source id="audioSource" src=""></source>
  Your browser does not support the audio format.
</audio>
        </>
    );
};