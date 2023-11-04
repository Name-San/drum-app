import {useState, useRef, useEffect} from 'react';

//Data
const kits = {
  'Heater Kit': [
    {
      id: 'Heater-1',
      name: 'Heater 1',
      btn: 'Q',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      id: 'Heater-2',
      name: 'Heater 2',
      btn: 'W',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      id: 'Heater-3',
      name: 'Heater 3',
      btn: 'E',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      id: 'Heater-4',
      name: 'Heater 4',
      btn: 'A',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      id: 'Clap',
      name: 'Clap',
      btn: 'S',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      id: 'Open-HH',
      name: 'Open HH',
      btn: 'D',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      id: "Kick-n'-Hat",
      name: "Kick n' Hat",
      btn: "Z",
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      id: 'Kick',
      name: 'Kick',
      btn: 'X',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      id: 'Closed-HH',
      name: 'Closed HH',
      btn: 'C',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ],
  'Smooth Piano Kit': [
    {
      id: 'Chord-1',
      name: 'Chord 1',
      btn: 'Q',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      id: 'Chord-2',
      name: 'Chord 2',
      btn: 'W',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      id: 'Chord-3',
      name: 'Chord 3',
      btn: 'E',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      id: 'Shaker',
      name: 'Shaker',
      btn: 'A',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      id: 'Open-HH',
      name: 'Open HH',
      btn: 'S',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      id: 'Closed-HH',
      name: 'Closed HH',
      btn: 'D',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      id: "Punchy-Kick",
      name: "Punchy Kick",
      btn: "Z",
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      id: 'Side-Stick',
      name: 'Side Stick',
      btn: 'X',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      id: 'Snare',
      name: 'Snare',
      btn: 'C',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ]
};

//React

function VolumeSlider({setDpText, setVolume, refText, isOn, volume}) {

  const handleVolumeChange = event => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);

    //update display momentarily
    setDpText(`Volume: ${(volume*100).toFixed()}`);
    setTimeout(() => {
      setDpText(refText);
    }, 1500);
  };


  
  return (
    <input max="1" min="0" step="0.01" type="range" value={volume} 
        onChange={isOn ? handleVolumeChange : null}/>
  );
}

function Control({name, toggleHandler, isOn}) {
  const [toggle, setToggle] = useState(true); 

  const handleToggle = (rem, name) => {
    setToggle(!toggle);
    toggleHandler(rem, name);
  }

  return (
    <div className="control">
      <p>{name}</p>
      <div className='select'>
        <div className='inner' style={{float: `${toggle ? 'right' : 'left'}`}} 
        onClick={isOn ? () => handleToggle(!toggle, name) : null}/>
      </div>
    </div>
  );
}

function Pad({id_drum, id_btn, audioSrc, name, volume, setDpText}) {
  const padCss = {
    default: {backgroundColor: 'grey', marginTop: 10, boxShadow: 'black 3px 3px 5px'},
    clicked: {backgroundColor: 'orange', marginTop: 13, boxShadow: 'orange 0px 3px', height: 77}
  }
  const [padStyle, setPadStyle] = useState(padCss.default);
  const audioRef = useRef(null);

  const playSound = () => {
    setPadStyle(padCss.clicked);

    audioRef.current.currentTime = 0;
    audioRef.current.play();
    
    setTimeout(() => {
      setPadStyle(padCss.default)
    }, 100)
  }
  
  const handleButtonClick = () => {
    if(setDpText) setDpText(name);
    playSound();
  }

  useEffect(() => {

    const handleKeyPress = (event) => {
      if(event.key.toUpperCase() === id_btn) {
        handleButtonClick();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [id_btn]);

  useEffect(() => {
    if(volume) {
      audioRef.current.volume = volume;
    }
  },[volume]);

  return (
    <div className='drum-pad' id={id_drum} style={padStyle} onClick={handleButtonClick}>
      <audio ref={audioRef} className="clip" id={id_btn} src={audioSrc}></audio>
      {id_btn}
    </div>
  );  
}

function Controller({isOn, dpText, volume, setVolume, setBank, setIsOn, setDpText}) {
  const textTracker = useRef(dpText);
  const options = {
    Bank: {
      text1: 'Smooth Piano Kit',
      text2: 'Heater Kit'
    },
    Power: {
      text1: 'Power On',
      text2: 'Power Off'
    }
  }
  let _text;
  
  const toggleHandler = (rem, iniate) => {
    rem ? _text = options[iniate].text1 : _text = options[iniate].text2 ;
    textTracker.current = _text;
    setDpText(_text);
    iniate == 'Bank' ? setBank(_text) : setIsOn(rem);
  }

  return (
    <div className='controls-container'>
      <Control name='Power' toggleHandler={toggleHandler} isOn={true}/>
      <p id='display'>{dpText}</p>
      <div class="volume-slider">
        <VolumeSlider 
          setVolume={setVolume}
          setDpText={setDpText} 
          refText={textTracker.current} 
          isOn={isOn}
          volume={volume}/>
      </div>
      <Control name='Bank' toggleHandler={toggleHandler} isOn={isOn}/>
    </div>
  );
}

function PadBank({kit, isOn, setDpText, volume}) {
  const pads = kit.map(item => 
    <Pad 
      id_drum={item.id} 
      id_btn={item.btn} 
      name={item.name} 
      audioSrc={isOn ? item.audio : '#'} 
      setDpText={isOn ? setDpText : null}
      volume={volume}/>
    );
  return (
    <div className='pad-bank'>
      {pads}
    </div>
  );
}

export default function Main() {
  const [currBank, setCurrBank] = useState("Smooth Piano Kit");
  const [power, setPower] = useState(true);
  const [dpText, setDpText] = useState(currBank);
  const [volume, setVolume] = useState(0.3);

  return (
  <div id="root">
    <div className='inner-container' id='drum-machine'>
      <PadBank 
        kit={kits[currBank]} 
        isOn={power} 
        setDpText={setDpText} 
        volume={volume}/>
      <Controller 
        setBank={setCurrBank} 
        setIsOn={setPower} 
        setDpText={setDpText} 
        setVolume={setVolume}
        volume={volume}
        isOn={power} 
        dpText={dpText}/>
    </div>
  </div>
  );
}