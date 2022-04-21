let pokemonRepository = (function () {
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
        let callPokemonList = document.querySelector('.list-group');
        let listPokemon = document.createElement('li');
        listPokemon.classList.add('group-list-item')
        let button = document.createElement('button');

        //Button Features
        button.innerText = pokemon.name;
        // button.classList.add('pokemon-buttons'); //taken from CSS
        button.classList.add('btn-primary', 'search-button');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');
        listPokemon.appendChild(button);
        callPokemonList.appendChild(listPokemon);

        //Button Event Listener that executes showDetails function when a pokemon button is clicked on
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

    function showModal(pokemon) {

        let modalTitle = $ ('.modal-title');
        let modalBody = $ ('.modal-body');
    
        let pokemonName = $('<h2>' + pokemon.name + '</h2>');
        let pokemonHeight = $('<p>' + pokemon.height + '</p>');
        let imageElement = $ ('<img class=\'pokemon-modal-image\'>');
        imageElement.attr ("src", pokemon.imageUrl);
        let imageElementBack = $ ('<img class=\'pokemon-modal-image\'>');
        imageElementBack.attr ("src", pokemon.imageUrlBack);
    
    
        let secondElement = document.createElement('p');
        pokemon.types.forEach((type, index) => {
          if (index === pokemon.types.length - 1) {
            secondElement.innerText += type.type.name;
          } else {
            secondElement.innerText += type.type.name + ", ";
          }
        })
    
        modalTitle.empty();
        modalBody.empty();;
    
        modalTitle.append(pokemonName);
        modalBody.append(imageElement);
        modalBody.append(imageElementBack);
        modalBody.append(secondElement);
        modalBody.append(pokemonHeight);
    
      }
    
      $(document).ready(function(){
      $('#myInput').on('keyup', function() {
      let value = $(this).val().toLowerCase();
      $(".search-button").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
      });
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
