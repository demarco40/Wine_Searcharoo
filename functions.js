//Searches and returns a list of pokemon names.
function search() {
    //Gets the uesr input and fetches all names containing the string. If null, returns all.
    let name = document.querySelector('#search')
    fetch(`/pokemon?name=${name.value}`)
        .then(response => {
            return response.json()
        })
        .then(json => {
            var li = document.querySelectorAll("li");
            if (li) {
                for (element of li) {
                    element.remove()
                }
            }

            for (pokemon of json) {
                var template = document.querySelector('#pokelist'),
                    pokemonname = template.content.querySelector(".mdl-list__item-primary-content");
                pokemonname.textContent = pokemon.name;

                pokemonname.setAttribute('data-pokemon', JSON.stringify(pokemon))
                var ul = document.querySelector("ul");
                var clone = document.importNode(template.content, true);
                ul.appendChild(clone);
            }
        })
}

//Displays the pokemon's information on the right side of the screen.
function select(ele) {
    var name = ele.querySelector('.mdl-list__item-primary-content')
    var pokemon = JSON.parse(name.getAttribute('data-pokemon'))
    document.querySelector('.pokemon_content').setAttribute('style', '')
    document.querySelector('#commentform').setAttribute('style', '')
    document.querySelector('#pokemonimage').setAttribute('src', `/image/${pokemon.number}`)
    document.querySelector('#pokemonname').textContent = pokemon.name
    document.querySelector('#number').textContent = 'Number: ' + pokemon.number
    document.querySelector('#number').setAttribute('data-number', pokemon.number)
    document.querySelector('#height').textContent = 'Height: ' + pokemon.height
    document.querySelector('#weight').textContent = 'Weight: ' + pokemon.weight
    document.querySelector('#catchrate').textContent = 'Catch Rate: ' + pokemon.catch_rate
    //Not all pokemon have the same number of abilites.
    var abilities = 'Abilities: ' + pokemon.abilities[0].name
    if (pokemon.abilities.length > 1) {
        abilities = abilities + ', ' + pokemon.abilities[1].name
    }
    document.querySelector('#abilities').textContent = abilities
    document.querySelector('#types').textContent = 'Types: ' + pokemon.types
    document.querySelector('#pokedexentry').textContent = 'Pokedex Entry: ' + pokemon.pokedex_entry
    document.querySelector('#comment').textContent = 'Comments: ' + pokemon.comment
}

//Updates the record of the selected pokemon by adding the user input as a comment.
function addComment(ele) {
    var comment = document.querySelector('#commentfield').value
    var number = document.querySelector('#number').getAttribute('data-number')
    //Retrieves the user input to insert.
    fetch(`/comment/${number}`, {
            method: 'PUT',
            body: JSON.stringify({
                comment: comment
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => {
            return response.json()
        })
}
