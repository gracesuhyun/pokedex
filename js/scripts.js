let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);  //push pokemon into the array
        } else {
            console.log('Must be a Pokemon with correct description');
        }
    }

    function filter(name) {
        return pokemonList.filter(pokemonList => pokemonList.name === name);
    }

    function searchPokemon(searchName) {
        //clear all buttons when search bar is used
        $('.pokemon-list').empty();
        //show searched pokemon(s) when search bar is used
        pokemonList.forEach(pokemon => {
            if (capitalizeFirstLetter(pokemon.name).indexOf(
                capitalizeFirstLetter(searchName)) > -1) {
                    addListItem(pokemon);
                }
        });
    }

    function capitalizeFirstLetter(pokemon) {
        return pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
    }

    function getAll() {
        return pokemonList;
    }

    //create pokemon buttons
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.list-group');
        let pokemonListItem = document.createElement('li');
        pokemonListItem.classList.add('group-list-item');
        let button = document.createElement('button');

        //Button Features
        button.innerText = pokemon.name;
        button.classList.add('pokemon-buttons','btn');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');
        pokemonRepository.handleButtonClick(button, pokemon); //event listener
        pokemonListItem.appendChild(button);
        pokemonList.appendChild(pokemonListItem);
    }

    //event listener that executes showDetails function when a pokemon button is clicked on
    function handleButtonClick(button, pokemon) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon);  //call showModal function when a pokemon button is clicked on
        });
    }

    //the result of this fetch function is a promise (response) that is then converted to json
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();  //json is the contents of the apiUrl
        }).then(function (json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: capitalizeFirstLetter(item.name),
                    detailsUrl: item.url
                };
                add(pokemon);
                // console.log(pokemon);  //this lists each pokemon object in the console
            });
        })
        .catch(function(e) {
            console.error(e);
        });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        })
        .then(function(details) {
            //add details to item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types.map((objects) => objects.type.name); //create a way to iterate through item.url using a for loop that will push it into an array of types and show to users 
        })
        .catch(function(e) {
            console.error(e);
        });
    }

    function showModal(pokemon) {

        let modalTitle = $ ('.modal-title');
        let modalBody = $ ('.modal-body');

        //clear existing content
        modalTitle.empty();
        modalBody.empty();
    
        let pokemonName = $('<h2>' + pokemon.name + '</h2>');
        let pokemonImage = $('<img class="modal-img" style="width:50%">');
        pokemonImage.attr('src', pokemon.imageUrl);
        let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
        let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
        let pokemonTypes = $('<p>' + 'Types: ' + pokemon.types.join(', ') + '</p>');
    
        modalTitle.append(pokemonName);
        modalBody.append(pokemonImage);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonWeight);
        modalBody.append(pokemonTypes);
    
      }

    return {
        add: add,
        filter: filter,
        searchPokemon: searchPokemon,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        handleButtonClick: handleButtonClick
    };
}) ();

//adding pokemon manually
// pokemonRepository.add( {
//     name: 'cresselia',
//     height: 1.5,
//     types: ['physic'] 
// });

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});





// To list pokemon names & specify if size is big:

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
