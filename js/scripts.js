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

// To list just the pokemon names:
// for (let i=0; i < pokemonList.length; i++) {
//     document.write(pokemonList[i].name);
// }

for (let i = 0; i < pokemonList.length; i++) {
    if(pokemonList[i].height > 1) {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - Wow that's a big pokemon!<br>")
    } else {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")<br>")
    }
}