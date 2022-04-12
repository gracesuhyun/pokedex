function showLoadingMessage() {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.remove('.loading-screen');
}

function hideLoadingMessage() {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('.loading-screen');
}

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);  //push pokemon into the array
        } else {
            console.log('Must be a Pokemon with correct description');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon){
        let callPokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        //button features
        button.innerText = pokemon.name;
        button.classList.add('pokemon-buttons'); //taken from CSS
        listPokemon.appendChild(button);
        callPokemonList.appendChild(listPokemon);
        //button event listener that executes showDetails function when a pokemon button is clicked on
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

    //the result of this fetch function is a promise (response) that is then converted to json
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();  //json is the contents of the apiUrl
        }).then(function (json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                hideLoadingMessage();
                // console.log(pokemon);  //this lists each pokemon object in the console
            });
        }).catch(function(e) {
            hideLoadingMessage();
            console.error(e);
        })
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            //add details to item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types; //create a way to iterate through item.url using a for loop that will push it into an array of types and show to users 
            hideLoadingMessage();
        }).catch(function(e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
}) ();

//adding pokemon manually
// pokemonRepository.add( {
//     name: 'cresselia',
//     height: 1.5,
//     types: ['physic'] 
// });

// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
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
