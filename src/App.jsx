import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have an App.css file for styling

const drumPads = [
  { key: 'Q', id: 'Heater-1', src: '/asset/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', src: '/asset/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', src: '/asset/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', src: '/asset/Heater-4.mp3' },
  { key: 'S', id: 'Clap', src: '/asset/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', src: '/asset/Dsc_Oh.mp3' },
  { key: 'Z', id: 'Kick-n-Hat', src: '/asset/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', src: '/asset/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', src: '/asset/Cev_H2.mp3' },
];

function DrumPad({ clipId, clip, keyTrigger, handlePlay }) {
  return (
    <div id={clipId} className="drum-pad" onClick={() => handlePlay(keyTrigger)}>
      {keyTrigger}
      <audio id={keyTrigger} className="clip" src={clip}></audio>
    </div>
  );
}

function DrumMachine() {
  const [display, setDisplay] = useState('');

  const handlePlay = (key) => {
    const audio = document.getElementById(key);
    audio.play();
    const pad = drumPads.find(pad => pad.key === key);
    setDisplay(pad.id);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      const pad = drumPads.find(pad => pad.key === key);
      if (pad) handlePlay(key);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div id="drum-machine" className="container">
      <div id="display">{display}</div>
      <div className="pad-container">
        {drumPads.map(pad => (
          <DrumPad
            key={pad.key}
            clipId={pad.id}
            clip={pad.src}
            keyTrigger={pad.key}
            handlePlay={handlePlay}
          />
        ))}
      </div>
      <div className="controls">
        <p>Power</p>
        <input type="checkbox" />
        <p>Bank</p>
        <input type="checkbox" />
        <input type="range" min="0" max="100" />
      </div>
    </div>
  );
}

export default DrumMachine;
