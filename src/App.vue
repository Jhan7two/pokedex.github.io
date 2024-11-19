<script setup>
import { ref } from 'vue';

const pokemones = ref([]); // Lista de todos los Pokémon
const tipos = ref([]); // Tipos de Pokémon únicos
const pokemontipo = ref([]); // Pokémon filtrados por tipo

const url = "https://pokeapi.co/api/v2/pokemon/";

// Función asíncrona para obtener Pokémon en orden
const obtenerPokemones = async () => {
  for (let i = 1; i <= 400; i++) {
    try {
      const res = await fetch(url + i);
      const data = await res.json();
      console.log(data); // Verificación de datos

      pokemones.value.push(data);

      // Agregar tipos únicos
      data.types.forEach(type => {
        if (!tipos.value.includes(type.type.name)) {
          tipos.value.push(type.type.name);
        }
      });
    } catch (error) {
      console.error('Error al obtener el Pokémon:', error);
    }
  }

  // Al terminar de cargar todos los Pokémon, asignamos todos a pokemontipo
  pokemontipo.value = pokemones.value;
};

// Llamamos a la función para iniciar la carga de los Pokémon
obtenerPokemones();

// Función para obtener el color del tipo
const obtenerColorTipo = (tipo) => {
  const colores = {
    grass: "#78C850",      // Verde
    poison: "#A040A0",     // Púrpura
    fire: "#F08030",       // Naranja
    flying: "#A890F0",     // Lila
    water: "#6890F0",      // Azul
    bug: "#A8B820",        // Verde oscuro
    normal: "#A8A878",     // Gris verdoso
    electric: "#F8D030",   // Amarillo
    ground: "#E0C068",     // Marrón claro
    fairy: "#EE99AC",      // Rosa claro
    fighting: "#C03028",   // Rojo oscuro
    psychic: "#F85888",    // Rosa
    rock: "#B8A038",       // Amarillo oscuro
    steel: "#B8B8D0",      // Gris acero
    ice: "#98D8D8",        // Azul claro
    ghost: "#705898",      // Púrpura oscuro
  };

  return colores[tipo] || "#e0e0e0"; // Color por defecto si no se encuentra el tipo
};
// Función para filtrar Pokémon por tipo
const filtrar_pokemon = (tipo) => {
  if (tipo === '') {
    // Si no se selecciona un tipo, mostramos todos los Pokémon
    pokemontipo.value = pokemones.value;
  } else {
    // Filtrar solo los Pokémon que tengan el tipo seleccionado
    pokemontipo.value = pokemones.value.filter(pokemon =>
      pokemon.types.some(t => t.type.name === tipo)
    );
  }
};

</script>


<template>
  <div class="pokedex">
    <header>
      <h1>POKEDEX POKEMON</h1>
      <nav>
        <ul>
          <!-- Mostrar todos los Pokémon cuando no se selecciona un tipo -->
          <li 
            v-on:click="filtrar_pokemon('')" 
            :style="{ backgroundColor: '#808080' }"
          >
            Todos
          </li>
          <li 
            v-on:click="filtrar_pokemon(tipo)" 
            v-for="tipo in tipos"
            :key="tipo" 
            :style="{ backgroundColor: obtenerColorTipo(tipo) }"
          >
            {{ tipo }}
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <div class="pokemon-grid">
        <div class="pokemon-card" v-for="pokemon in pokemontipo" :key="pokemon.id">
          <img v-if="pokemon.sprites.front_default" :src="pokemon.sprites.front_default" :alt="pokemon.name">
          <p>{{ pokemon.name }}</p>
          <ul class="pokemon-types">
            <li v-for="type in pokemon.types" :key="type.type.name" :style="{ backgroundColor: obtenerColorTipo(type.type.name) }">
              {{ type.type.name }}
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>



<style scoped>
.pokedex {
  font-family: Arial, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

h1 {
  color: #333;
  text-align: center;
  margin: 0 0 20px 0;
  font-size: 2rem;
}

nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

nav li {
  color: white;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

nav li:hover {
  background-color: #d0d0d0;
  transform: scale(1.05);
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr) ,max-width());
  gap: 20px;
}

.pokemon-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.pokemon-card img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.pokemon-card p {
  margin: 10px 0;
  font-weight: bold;
  color: #333;
  text-transform: capitalize;
}

.pokemon-types {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.pokemon-types li {
  color: white;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.8em;
}
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

/* Para pantallas grandes */
@media (min-width: 1200px) {
  .pokemon-grid {
    grid-template-columns: repeat(6, 1fr); /* Exactamente 6 columnas */
  }
}

/* Para pantallas medianas */
@media (max-width: 1199px) and (min-width: 900px) {
  .pokemon-grid {
    grid-template-columns: repeat(4, 1fr); /* 4 columnas */
  }
}

/* Para pantallas pequeñas */
@media (max-width: 899px) and (min-width: 600px) {
  .pokemon-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  }
}

/* Para pantallas muy pequeñas */
@media (max-width: 599px) {
  .pokemon-grid {
    grid-template-columns: 1fr; /* 1 columna */
  }
}

</style>
