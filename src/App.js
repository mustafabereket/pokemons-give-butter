import { useEffect, useState } from "react";
import {fetchAllPokemon, fetchEvolutionChainById, fetchPokemonDetailsByName} from "./api";

function App() {
    const [pokemonIndex, setPokemonIndex] = useState([])
    const [pokemon, setPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [loading, setLoading] = useState(false);  // Loading state

    useEffect(() => {
        const fetchPokemon = async () => {
            const {results: pokemonList} = await fetchAllPokemon()
            setPokemon(pokemonList)
            setPokemonIndex(pokemonList)
        }
        fetchPokemon().then(() => {
            /** noop **/
        })
    }, [])

    const onSearchValueChange = (event) => {
        const value = event.target.value
        setSearchValue(value)
        setPokemon(
            pokemonIndex.filter(monster => monster.name.includes(value)) // first bug here, removed '!'
        )
    }

    const renderList = (list) => {
        return (
            <div className={'pokedex__search-results'}>
                {
                    list.map(monster => {
                        return (
                            <div className={'pokedex__list-item'} key={monster.name}>
                                <div>
                                    {monster.name}
                                </div>
                                <button onClick={onGetDetails(monster.name)}>Get Details</button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const displayContent = () => {
        // This is main logic for displaying the right list (pokemon or pokemonIndex)
        if(pokemon.length > 0 && searchValue) {
            // return following if there are search results
            return renderList(pokemon);
        }

        if(pokemon.length === 0 && searchValue) {
            // return following if there is search value but no result
            return (<p>No Results Found</p>)
        }

        // else return our main list (pokemonIndex)
        return renderList(pokemonIndex);
    }

    const getEvolutionChain = (chain) => {
        // Evolution chain
        // BFS until we hit empty evolves to
        const result = chain.species?.name ? [chain.species?.name] : [];
        let evolvesTo = chain.evolves_to || [];

        while (evolvesTo.length) {
            let evolved = evolvesTo.shift();
            result.push(evolved.species.name);
            evolvesTo = evolved.evolves_to;
        }

        return result;
    }

    const onGetDetails = (name) => async () => {
        /** code here **/
        if(pokemonDetails?.name !== name) {
            setLoading(true);
            const result = await fetchPokemonDetailsByName(name);
            const evo = await fetchEvolutionChainById(result.id);
            result.evolutionChain = getEvolutionChain(evo.chain);
            setPokemonDetails(result);
            setLoading(false);
        }
    }

    return (
        <div className={'pokedex__container'}>
            <div className={'pokedex__search-input'}>
                <input value={searchValue} onChange={onSearchValueChange} placeholder={'Search Pokemon'}/>
            </div>
            <div className={'pokedex__content'}>
                {displayContent()}
                {
                    pokemonDetails && (
                        <div className={'pokedex__details'}>
                            {/*  code here  */}
                            {loading ? <p>Loading...</p> : <Card pokemonDetails={pokemonDetails} />}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

const Card = ({pokemonDetails}) => {
    const moves = pokemonDetails?.moves?.slice(0,4) || [<li>No Moves Found</li>]; // slicing first 4 to match mock-up
    const types = pokemonDetails?.types?.slice(0,4) || [<li>No Types Found</li>];
    return (
        <>
                <span className={"pokedex__title"}>
                    {pokemonDetails.name}
                </span>
            <div className={"pokedex__skills"}>
                <div>
                    <div className={"pokedex__title"}>Types</div>
                    <ul>
                        {types.map(type => <li key={type.type.name}>{type.type.name}</li>)}
                    </ul>
                </div>
                <div>
                    <div className={"pokedex__title"}>Moves</div>
                    <ul>
                        {moves.map(move => <li key={move.move.name}>{move.move.name}</li>)}
                    </ul>
                </div>
            </div>
            <div className={'pokedex__evs'}>
                <div className="pokedex__title">Evolutions</div>
                <div>{pokemonDetails.evolutionChain.map(evs => <span key={evs} className={'pokedex__evs_items'}>{evs}</span>)}</div>
            </div>
        </>
    )
}

export default App;
