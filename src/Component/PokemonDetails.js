import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PokemonDetails.css'; // Create and style your PokemonDetails component appropriately

const PokemonDetails = () => {
    const { pokemonId } = useParams();
    const navigate = useNavigate();
    const [pokemonDetails, setPokemonDetails] = useState(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const details = await response.json();
                setPokemonDetails(details);
            } catch (error) {
                console.error("Failed to fetch Pokémon details", error);
            }
        };

        fetchPokemonDetails();
    }, [pokemonId]);

    const goToNextPokemon = () => {
        navigate(`/pokemon/${parseInt(pokemonId) + 1}`);
    };

    const goToPreviousPokemon = () => {
        navigate(`/pokemon/${parseInt(pokemonId) - 1}`);
    };

    const backToPokedex = () => {
        navigate('/');
    };

    if (!pokemonDetails) return <p>Loading...</p>;

    return (
        <div className="pokemon-details-container">
            <div className="pokemon-details-card">
                <h1>{pokemonDetails.name}</h1>
                <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
                <div className="pokemon-metadata">
                    <h3>Types</h3>
                        {pokemonDetails.types.map((typeEntry) => (
                            <p key={typeEntry.type.name}>{typeEntry.type.name}</p>
                        ))}

                    <h3>Stats</h3>
                        {pokemonDetails.stats.map((statEntry) => (
                            <p key={statEntry.stat.name}>
                                {statEntry.stat.name}: {statEntry.base_stat}
                            </p>
                        ))}

                    <h3>Abilities</h3>
                        {pokemonDetails.abilities.map((abilityEntry) => (
                            <p key={abilityEntry.ability.name}>{abilityEntry.ability.name}</p>
                        ))}
                </div>

                <div className="navigation-buttons">
                    {parseInt(pokemonId) > 1 && (
                        <button onClick={goToPreviousPokemon}>Previous</button>
                    )}
                    <button onClick={backToPokedex}>Back to Pokedex</button>
                    <button onClick={goToNextPokemon}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetails;
