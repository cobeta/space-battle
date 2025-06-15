import React from 'react';
import './FireButton.css';

function FireButton( {gameData, handleFire} ) {
    const buttonText = {
        start: 'Fire!',
        fire: 'Fire again',
        win: 'Restart',
        lose: 'Restart'
    }
    
    return (
        <button id='fire-button' className='fireButton' onClick={handleFire}>
            {buttonText[gameData.status]}
        </button>
    );
}

export default FireButton;