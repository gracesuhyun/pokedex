let pokemonRepository = (function () {
    let modalContainer = document.querySelector('.modal-container');
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList;
    }

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
        return fetch(apiUrl).then(function (response) {
            return response.json();  //json is the contents of the apiUrl
        }).then(function (json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                // console.log(pokemon);  //this lists each pokemon object in the console
            });
        }).catch(function(e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            //add details to item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types; //create a way to iterate through item.url using a for loop that will push it into an array of types and show to users 
        }).catch(function(e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);  //call showModal function when a pokemon button is clicked on
        });
    }

    function showModal(item) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //modal close button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        // modal: pokemon name
        let titleElement = document.createElement('h3');
        titleElement.innerText = item.name;

        // modal: pokemon height
        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height:  ' + item.height;

        //modal: pokemon types
        let typesElement = document.createElement('p');
        if (item.types.length > 0) {
            let types = '';
            item.types.forEach(function(i) {
                console.log(i)
                types += i.type.name + ' ';
            });
            typesElement.innerText = 'Type(s):  ' + types;
        }

        //modal: pokemon image
        let imageElement = document.createElement('img');
        imageElement.classList.add('image-element');
        imageElement.src = item.imageUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(typesElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    //hide modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
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
