let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);  //pushes or adds pokemon into the array
        } else {
            console.log('Error: Must be a Pokemon with correct description!');
        }
    }

    //retrieves all items from apiUrl? is this required for any js code retrieving info from API?
    function getAll() {
        return pokemonList;
    }

    //this fetch function is a promise that allows all the items pushed to run asynchronously
    function loadList() {
        return fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            json.results.forEach(function(item, index) {
                let link = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
                let pokemon = {
                    image: link,
                    name: capitalizeFirstLetter(item.name),
                    detailsUrl: item.url
                };
                add(pokemon);
                // console.log(pokemon);  //this lists each pokemon object in the console
            });
        })
        //in the case of the call to API failing...
        .catch(function(e) {
            console.error(e);
        });
    }

    //create pokemon buttons (create, do, append)
    function addListItem(pokemon, index){

        let pokemonList = document.querySelector('.list-group');

        //we created a list element 
        let pokemonListItem = document.createElement('li');

        //we did a bunch of stuff to list element
        pokemonListItem.classList.add('group-list-item');
        let button = document.createElement('button');
        let image = document.createElement('img');
        image.setAttribute('src', pokemon.image);

        button.innerText = pokemon.name;
        button.classList.add('pokemon-buttons','btn');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');
        button.appendChild(image);
        pokemonRepository.handleButtonClick(button, pokemon); //event listener

        pokemonListItem.appendChild(button);

        //we pushed it to pokemonList on line 50
        pokemonList.appendChild(pokemonListItem);
    }

    //event listener that executes showDetails function when a pokemon button is clicked on
    function handleButtonClick(button, pokemon) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
        .then(function(response) {
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

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon);  //call showModal function when a pokemon button is clicked on
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

    function capitalizeFirstLetter(pokemon) {
        return pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
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

    return {
        add: add,
        searchPokemon: searchPokemon,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        handleButtonClick: handleButtonClick
    };
}) ();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

console.log(pokemonList, 'pokemonList');



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