import React from 'react';
import './GameInfo.css'

const GameInfo = ({gameData}) => {
    const texts = {
        start: 'Click on "Fire" to start playing',
        fire: 'Continue clicking on "Fire" until one player wins',
        win: 'You have won the battle! Click on the button to restart',
        lose: 'You have lost the battle! Click on the button to restart'
    }

    return (
        <div className="gameInfo">
            <p> {texts[gameData.status]} </p>
        </div>
    );
};

export default GameInfo;