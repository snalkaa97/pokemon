const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
	const promises = [];
	for (let i = 1; i <= 150; i++) {
		const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		promises.push(
			fetch(url).then((res) => {
				return res.json();
			})
		);
	}
	Promise.all(promises).then((results) => {
		const pokemon = results.map((data) => ({
			id: data.id,
			name: data.name,
			image: data.sprites["front_default"],
			type: data.types.map((type) => type.type.name).join(", "),
		}));
		console.log(pokemon);
		displayPokemon(pokemon);
	});
};

const displayPokemon = (pokemon) => {
	const pokemonHTML = pokemon
		.map(
			(pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle"> Type: ${pokeman.type}</p>
        </li>
    `
		)
		.join(" ");
	pokedex.innerHTML = pokemonHTML;
};

fetchPokemon();
