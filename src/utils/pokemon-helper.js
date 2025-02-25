export const getTypeIconSrc = (type) => `./images/types-icons/${ type }.svg`;

/**

 *
 * @param {Object} pokemon
 * @param {number} pokemon.id 
 * @param {string} pokemon.name
 * @param {Object} pokemon.sprites 
 * @param {number} pokemon.weight 
 * @param {number} pokemon.height 
 * @param {Array} pokemon.types 
 * @returns {Object} 
 */
export const formatPokemonData = (pokemon) => {
    const { id, name, sprites, weight, height, types } = pokemon;
    
    const weightInKg = (weight / 10 ) + 'kg';
    const heightInMeter = (height / 10 ) + 'm';
    const paddedId = String(id).padStart(3, '0');
    const formattedTypes = types.map(({ type }) => type);
    const pokemonImg = sprites.other.dream_world.front_default || sprites.other['official-artwork'].front_default;

    return {
        ...pokemon,
        paddedId,
        weight: weightInKg,
        imgSrc: pokemonImg,
        height: heightInMeter,
        types: formattedTypes,
        name: removeHyphens(name),
    };
}

/**
 *
 *
 * @param {Array} stats 
 * @returns {Array} 
 */
export function formatStats(stats) {
    const statsMaxValues = {
        hp: 714,
        attack: 714,
        defense: 614,
        "special-attack": 504,
        "special-defense": 614,
        speed: 504,
    }

    const statsObject = stats.map(({ stat, base_stat }) => {
        return {
            name: removeHyphens(stat.name),
            value: base_stat,
            max: statsMaxValues[stat.name]
        }
    });

    const total = stats.reduce((total, { base_stat }) => total + base_stat, 0);
    
    return [
        ...statsObject,
        { name: 'total', value: total }
    ];
}

export function normalizeEvolutionChain(evolutionChain) {
    const { species, evolves_to } = evolutionChain;
    
    if(! evolves_to.length) {
        return [];
    }
    
    const evolutions = evolves_to.reduce((chain, evolution) => {
        return [
            ...chain,
            {
                current: {
                    name: species.name,
                    image: getPokemonImage(species.url),
                },
                next: {
                    name: evolution.species.name,
                    image: getPokemonImage(evolution.species.url),
                },
            },
            ...normalizeEvolutionChain(evolution)
        ];
    }, []);

    return evolutions;
}

/**
 * 
 * 
 *
 * @param {string} url
 * @returns {string} 
 */
const getPokemonImage = (url) => {
    const id = url.match(/\/(\d+)\//)[1];
    const isPokemonHasSvg = id < 650; 

    const base = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other`;
    
    if(isPokemonHasSvg) {
        return `${ base }/dream-world/${ id }.svg`;
    }
    
    return `${ base }/official-artwork/${ id }.png`;
};

const removeHyphens = (string) => {
    return string.replace(/-/g, ' ');
}