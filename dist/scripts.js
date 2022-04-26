let pokemonRepository=function(){let t=[],e="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(e){"object"==typeof e&&"name"in e&&"detailsUrl"in e?t.push(e):console.log("Must be a Pokemon with correct description")}function o(t){return t.charAt(0).toUpperCase()+t.slice(1)}function i(t){let e=document.querySelector(".list-group"),n=document.createElement("li");n.classList.add("group-list-item");let o=document.createElement("button");o.innerText=t.name,o.classList.add("pokemon-buttons","btn"),o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#pokemonModal"),pokemonRepository.handleButtonClick(o,t),n.appendChild(o),e.appendChild(n)}function l(t){a(t).then(function(){console.log(t),function(t){let e=$(".modal-title"),n=$(".modal-body");e.empty(),n.empty();let o=$("<h2>"+t.name+"</h2>"),i=$('<img class="modal-img" style="width:50%">');i.attr("src",t.imageUrl);let l=$("<p>Height: "+t.height+"</p>"),a=$("<p>Weight: "+t.weight+"</p>"),r=$("<p>Types: "+t.types.join(", ")+"</p>");e.append(o),n.append(i),n.append(l),n.append(a),n.append(r)}(t)})}function a(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.weight=e.weight,t.types=e.types.map(t=>t.type.name)}).catch(function(t){console.error(t)})}return{add:n,filter:function(e){return t.filter(t=>t.name===e)},searchPokemon:function(e){$(".pokemon-list").empty(),t.forEach(t=>{o(t.name).indexOf(o(e))>-1&&i(t)})},getAll:function(){return t},addListItem:i,loadList:function(){return fetch(e).then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){n({name:o(t.name),detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:a,showDetails:l,handleButtonClick:function(t,e){t.addEventListener("click",function(){l(e)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});