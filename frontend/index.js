let pokemonData = [];


// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    {
      className:
        "bg-blue-100 shadow-lg rounded-lg p-4 m-2 w-40 flex flex-col items-center transform transition-transform hover:scale-105",
    },
    React.createElement("img", {
      src: props.image,
      alt: props.name,
      className: "w-24 h-24 mb-2",
    }),
    React.createElement(
      "h2",
      { className: "text-lg font-semibold text-gray-800" },
      props.name
    ),
    React.createElement(
      "p",
      { className: "text-sm text-gray-600" },
      `Type: ${props.types}`
    )
  );
}


// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "flex flex-wrap justify-center" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.join("/"),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}




// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "" },
    React.createElement(
      "header",
      { className: "" },
      React.createElement(
        "h1",
        { className: "text-3xl text-center font-bold underline" },
        "Pokedex"
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
