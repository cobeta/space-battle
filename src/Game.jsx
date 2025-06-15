import React from 'react';
import FireButton from './FireButton.jsx';
import PlayerBox from './PlayerBox.jsx';
import GameInfo from './GameInfo.jsx'
import { useState } from 'react';

const Game = () => {
    const INITIAL_STATE = {playerHealth:100,enemyHealth:100, status:'start'}

    const [gameData, setGameData] = useState(INITIAL_STATE)

    const getRandomDamage = () => {
        return Math.floor(Math.random() * 40);
    }

    const fire = () => {
        if (gameData.status === 'win' || gameData.status === 'lose' || gameData.status === 'tie') {
            setGameData(() => INITIAL_STATE)
        } else {
            const newPlayerHealth = gameData.playerHealth - getRandomDamage();
            const newEnemyHealth = gameData.enemyHealth - getRandomDamage();
            
            let newStatus;
            
            if (newPlayerHealth < 0) {
                if (newEnemyHealth < 0) {
                    newStatus = 'tie';
                } else {
                    newStatus = 'lose';
                }
            } else if (newEnemyHealth < 0) {
                newStatus = 'win';
            } else {
                newStatus = 'fire';
            }

            setGameData(() => ({
                playerHealth: newPlayerHealth,
                enemyHealth: newEnemyHealth,
                status: newStatus
            }))
        }
    };

    const showAnimation = () => {
        const bomb = document.createElement('div');
        bomb.style.position = 'absolute';
        bomb.style.left = '50%';
        bomb.style.top = '50%';
        bomb.style.transform = 'translate(-50%, -50%)';
        bomb.style.width = '80px';
        bomb.style.height = '80px';
        bomb.style.borderRadius = '50%';
        bomb.style.background = 'radial-gradient(circle at 30% 30%, #fff 0%, #ff0 40%, #f00 80%, #000 100%)';
        bomb.style.boxShadow = '0 0 60px 30px #f00, 0 0 120px 60px #ff0';
        bomb.style.zIndex = 9999;
        bomb.style.animation = 'explode 0.7s ease-out forwards';

        document.body.appendChild(bomb);

        const style = document.createElement('style');
        style.innerHTML = `
        @keyframes explode {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
            60% { transform: translate(-50%, -50%) scale(1.4); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }`;
        document.head.appendChild(style);

        setTimeout(() => {
            bomb.remove();
            style.remove();
        }, 700);
    };

    const handleFire = () => {
        if (gameData.status === 'win' || gameData.status === 'lose') {
            setGameData(() => INITIAL_STATE);
            return;
        }
        showAnimation();
        fire();        
    };


    return (
        <div className="game-container">
            <PlayerBox label='Player' health={gameData.playerHealth} position='left'></PlayerBox>
            <FireButton gameData={gameData} handleFire={handleFire}></FireButton>
            <PlayerBox label='Enemy' health={gameData.enemyHealth} position='right'></PlayerBox>
            <GameInfo gameData={gameData}></GameInfo>
        </div>
    );
};

export default Game;