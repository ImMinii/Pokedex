// Pokemon.js
import React from 'react';
import './Pokemon.css'; // make sure to create a CSS file for styling

const Pokemon = ({ id, name, image }) => {
    return (
        <div className="pokemon">
            <div className="pokemon-number">#{id}</div>
            <img src={image} alt={name} />
            <div className="pokemon-name">{name}</div>
        </div>
    );
};

export default Pokemon;
