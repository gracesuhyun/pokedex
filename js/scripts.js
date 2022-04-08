let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 0.7,
            types: ['grass', 'poison']
        },
        {
            name: 'Charizard',
            height: 1.7,
            types: ['fire', 'flying']
        },
        {
            name: 'Butterfree',
            height: 1.1,
            types: ['bug', 'flying']
        },
        {
            name: 'Pikachu',
            height: 0.4,
            types: ['electric']
        },
        {
            name: 'Jigglypuff',
            height: 0.5,
            types: ['fairy', 'normal']
        }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        getAll: getAll
    };
}) ();

pokemonRepository.add( {
    name: 'Alakazam',
    height: 1.5,
    types: ['physic'] 
});

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height > 1) {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + ' - Wow that\'s a big pokemon!</p>');
    } else {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')</p>');
    }
});



// for (let i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height > 1) {
//         document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - Wow that's a big pokemon!</p>")
//     } else {
//         document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")</p>")
//     }
// }



// To list just the pokemon names:

// for (let i=0; i < pokemonList.length; i++) {
//     document.write(pokemonList[i].name);
// }
