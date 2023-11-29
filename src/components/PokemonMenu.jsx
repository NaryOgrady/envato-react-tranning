import { useEffect, useState } from 'react'

import PokemonItem from './PokemonItem'

function ListItems({ pokemonList }) {
  return pokemonList.map(p => (
    <li key={p.name}>
      <PokemonItem pokemon={p} />
    </li>
  ))
}

const Pagination = ({ total, pageNumber, setPageNumber }) => {
  const totalPages = Math.ceil(total / 20)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return <div className='flex'>
    {pages.map(p => (
      <button
        key={p}
        className={`mx-1 rounded ${pageNumber === p ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        onClick={() => setPageNumber(p)}
      >
        {p}
      </button>
    ))}
  </div>
}

export default function PokemonMenu() {
  const [pokemonArray, setPokemonArray] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchPokemon = async () => {
      const offset = (pageNumber - 1) * 20
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      const data = await resp.json()
      setPokemonArray(data.results)
      setTotal(data.count)
    }
    fetchPokemon()
  }, [pageNumber])

  return (<div className="flex flex-col h-screen items-center">
    <h1 className="text-4xl font-bold">Pokemon Menu</h1>
    {!pokemonArray.length ?
      <div>Loading...</div> :
      <ul>
        <ListItems pokemonList={pokemonArray} />
      </ul>
    }
    <div className='fixed bottom-0 h-12 bg-white py-2'>
      <Pagination total={total} pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </div>
  </div>)
}
