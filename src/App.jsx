import React, { useState } from 'react';
import styled from 'styled-components';
import offSound from'./sound/offSound.mp3';
import onSound from './sound/onSound.mp3';
import bank1Sound from './sound/bank1Sound.mp3';
import bank2Sound from './sound/bank2Sound.mp3';

// Styled components
const Body = styled.div`
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #1f1c2c, #928dab);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const PadContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const DrumPad = styled.div`
  color: #fff;
  width: 100px;
  height: 100px;
  background-color: #1e95ab;
  border-radius: 10px;
  box-shadow: 0 4px #3f3e3f, 0 20px 14px rgba(255, 204, 0, 0.8);
  margin: 5px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    background-color: #ffcc00; /* Hover color */
    color: #333;
  }

  &:active {
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: gradient(145deg, rgba(0,5,5,0.2));
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 4, 0, 0.5);
  margin-left: 100px;
  border-shadow: 0 2px rgba(255, 245, 0, 0.4);
`;

const Paragraph = styled.p`
  color: #fff;
  font-size: 18px;
  margin: 0;
  text-transform: uppercase;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #000;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:checked {
    background-color: #0000ff;
  }

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: #0000ff;
    border-radius: 5px;
    transition: transform 0.3s ease;
  }

  &:checked::before {
    transform: translateX(20px);
    background-color: #000;
  }
`;

const RangeInput = styled.input.attrs({ type: 'range' })`
  width: 150px;
  height: 5px;
  background: linear-gradient(90deg, #4caf50 0%, #fff 100%);
  border-radius: 5px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-runnable-track {
    height: 5px;
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px #f8a622;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px #000;
  }
`;

// const Button = styled.button`
//   background-color: #a9a9a9;
//   color: #000;
//   font-size: 18px;
//   text-transform: uppercase;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
//   box-shadow: 0 4px #666;
//   font-weight: bold;
//   opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  
//   &:hover {
//     background-color: #ffcc00;
//     color: #333;
//   }

//   &:active {
//     box-shadow: none;
//     transform: translateY(4px);
//   }
// `;

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

function DrumPadComponent({ clipId, clip, keyTrigger, handlePlay }) {
  return (
    <DrumPad id={clipId} onClick={() => handlePlay(keyTrigger)}>
      {keyTrigger}
      <audio id={keyTrigger} className="clip" src={clip}></audio>
    </DrumPad>
  );
}

function DrumMachine() {
  const [display, setDisplay] = useState('');
  const [power, setPower] = useState(false);
  const [bank, setBank] = useState(false);
  const [volume, setVolume] = useState(50);

  const handlePlay = (key) => {
    if (!power) return;
    const audio = document.getElementById(key);
    if (audio) {
      audio.volume = volume / 100;
      audio.play();
      const pad = drumPads.find(pad => pad.key === key);
      setDisplay(pad.id);
    }
  };

  const handlePowerToggle = () => {
    const newPowerState = !power;
    setPower(newPowerState);
    setDisplay(newPowerState ? `Power On - Volume: ${volume}%` : 'Power Off');
    if (newPowerState) {
      playSound(onSound);
    }
  };

  const handleBankToggle = () => {
    if (power) {
      const newBankState = !bank;
      setBank(newBankState);
      const sound = newBankState ? bank2Sound : bank1Sound;
      setDisplay(`Bank ${newBankState ? '2' : '1'} - Volume: ${volume}%`);
      playSound(sound);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (power) {
      setDisplay(`Volume: ${newVolume}%`);
    }
  };

  const playSound = (src) => {
    if (power) {
      const audio = new Audio(src);
      audio.volume = volume / 100;
      audio.play().catch((error) => {
        console.error('Error playing sound:', error);
      });
    }
  };

  return (
    <Body>
      <Container id="drum-machine">
        <PadContainer>
          {drumPads.map(pad => (
            <DrumPadComponent
              key={pad.key}
              clipId={pad.id}
              clip={pad.src}
              keyTrigger={pad.key}
              handlePlay={handlePlay}
            />
          ))}
        </PadContainer>

        <Controls>
          <Paragraph>Power</Paragraph>
          <Checkbox checked={power} onChange={handlePowerToggle} />
          <Paragraph id="display">{display}</Paragraph>
          <RangeInput
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            disabled={!power}
          />
          <Paragraph>Bank</Paragraph>
          <Checkbox checked={bank} onChange={handleBankToggle} disabled={!power} />
        </Controls>
      </Container>
    </Body>
  );
}

export default DrumMachine;
