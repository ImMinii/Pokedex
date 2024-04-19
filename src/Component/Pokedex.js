// Pokedex.js
import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import './Pokedex.css';
import { Link } from 'react-router-dom';

const typeColors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const pokemon_per_page = 20;

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([]);
    const [currentPage, setCurrentPage]  = useState(0);
    const [loading, setLoading] = useState(true);
    const [totalPokemon, setTotalPokemon] = useState(0);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const offset = currentPage * pokemon_per_page;
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemon_per_page}&offset=${offset}`);
                const data = await response.json();
                setTotalPokemon(data.count); // Total number of Pokémon available
                const promises = data.results.map(async (pokemon) => {
                    let pokemonRecord = await fetch(pokemon.url);
                    pokemonRecord = await pokemonRecord.json();
                    return {
                        id: pokemonRecord.id,
                        name: pokemonRecord.name,
                        image: pokemonRecord.sprites.front_default,
                        types: pokemonRecord.types
                    };
                });
                const results = await Promise.all(promises);
                setPokemons(results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching pokemons: ", error);
            }
        };

        fetchPokemons();
    }, [currentPage]);

    const goToNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
        <div className="pokedex">
            {pokemons.map(pokemon => (
                <Link
                    key={pokemon.id}
                    to={`/pokemon/${pokemon.id}`}
                    style={{ backgroundColor: typeColors[pokemon.types[0].type.name] }}
                    className="pokemon-link"
                >
                    <div className="pokemon">
                        <div className="pokemon-number">#{pokemon.id}</div>
                        <img src={pokemon.image} alt={pokemon.name} />
                        <div className="pokemon-name">{pokemon.name}</div>
                    </div>
                </Link>
            ))}
        </div>
            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <button onClick={goToNextPage} disabled={(currentPage + 1) * pokemon_per_page >= totalPokemon}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pokedex;