export default function PokemonItem({ pokemon }) {
  const name = pokemon.name
  const number = pokemon.url.split('/')[6]
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`

  return <div className='flex'>
    <button>
      {name}
    </button>
    <img src={imageUrl} alt="pokemon sprite" />
  </div>
}
