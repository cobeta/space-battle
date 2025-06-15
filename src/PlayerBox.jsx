import React from "react";
import './PlayerBox.css'

function PlayerBox({ label, health, position}) {
    return (
        <div className={`player-box ${position}`}>
            <p>{label} Health: {health > 0 ? health : 0} 🧡</p>
        </div>
    );
}

export default PlayerBox;