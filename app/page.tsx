'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { PokemonCard, ShinyToggle } from './components'

export type PokemonResults = {
  name: string
  url: string
}

export type PokemonSpeciesResponse = {
  count: number
  next: number
  previous: number
  results: PokemonResults[]
}

const getAllPokemonSpecies = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon-species/?limit=1018'
  const response = await fetch(url)
  const data = (await response.json()) as PokemonSpeciesResponse
  return data
}

export default function Home() {
  const [data, setData] = useState<PokemonSpeciesResponse>()
  const [showShiny, setShowShiny] = useState(false)
  const [category, setCategory] = useState<string>()

  const [searchInput, setSearchInput] = useState('')
  const searchResults =
    searchInput.length > 0 ? data?.results.filter((pokemon) => pokemon.name.includes(searchInput)) : data?.results

  useEffect(() => {
    getAllPokemonSpecies().then((pokemon) => setData(pokemon))
  }, [])

  const router = useRouter()

  const handlePokemonClick = async (name: string) => router.push('/pokemon/' + name)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)

  const handleSetCategory = (category: string) => setCategory(category)

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <main className='h-full'>
        <div className='grid grid-cols-3 p-2 bg-slate-800 drop-shadow-sm'>
          <input
            type='search'
            placeholder='type pokemon name'
            onChange={handleSearchChange}
            value={searchInput}
            autoFocus
            className='h-9 p-2.5 z-20 text-sm border focus:ring-blue-500 bg-slate-700 border-slate-600 placeholder-slate-400 text-white focus:border-pink-500'
          />
          <div className='flex self-stretch'>
            <ShinyToggle isOn={showShiny} onToggle={() => setShowShiny(!showShiny)} />
          </div>
        </div>

        <div className='flex justify-around h-full overflow-y-scroll scrollbar p-2'>
          <div className='grid grid-cols-3 gap-2'>
            {searchResults?.map((pokemon, i) => {
              return (
                <PokemonCard
                  pokemon={pokemon.name}
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    showShiny ? 'shiny/' : ''
                  }${pokemon.url
                    .substring(pokemon.url.length - 5, pokemon.url.length - 1)
                    .replace('/', '')
                    .replace('s', '')
                    .replace('e', '')}.png`}
                  key={pokemon.name}
                  onClick={() => handlePokemonClick(pokemon.name)}
                />
              )
            })}
          </div>
        </div>
        <div className='sticky bottom-[00vh]'>
          <div className='h-12 bg-gradient-to-t from-slate-900'></div>
          <div className='h-fit bg-slate-900 text-xs text-slate-700 text-center'>
            created using pokemon api and pokenode | pokemon and all respective names are trademark and copyright of
            nintendo.{' '}
          </div>
        </div>
      </main>
    </div>
  )
}
