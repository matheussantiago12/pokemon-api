const API_URL = 'https://pokeapi.co/api/v2'

$(() => {
    localStorage.clear()
    const pokemonList = $('.pokemon-list')

    const renderPokemon = (pokemon) => {
        const formattedName = (pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1)
        pokemonList.append(`
        <div class="poke-card" onclick="redirect('${formattedName}')">
        <p>${formattedName}</p>
        <img src="${pokemon.sprites.front_default}" />
        </div>
        `)
    }

    const fetchApi = (resource, callback) => {
        $.ajax(`${API_URL}/${resource}`, {
            type: 'GET',
            success: callback,
            error: alert
        })
    }


    const getAll = () => {
        fetchApi('pokemon?limit=49', res => {
            res.results.map(pokemon => {
                fetchApi(`pokemon/${pokemon.name}`, renderPokemon)
            })
        })
    }

    const searchButton = document.querySelector('#search-button')

    searchButton.onclick = () => {
        const pokemon = document.getElementById('pokemon-name').value
        const lowerCaseName = pokemon.toLowerCase().trim()

        fetchApi(`pokemon/${lowerCaseName}`, res => {
            const pokemon = res
            const formattedName = (pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1)

            pokemonList.html(`
                <div class="poke-card" onclick="redirect('${formattedName}')">
                    <p>${formattedName}</p>
                    <img src="${pokemon.sprites.front_default}" />
                </div>
            `)
        })
    }
    
    getAll()
})

const redirect = (namePokemon) => {
    localStorage.setItem('pokemon', namePokemon.toLowerCase());

    window.location.href = '../layout-specific/index.html';
}