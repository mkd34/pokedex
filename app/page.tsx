'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { PokemonCard, ShinyToggle } from './components'
import { SearchBarDropDown } from './components/SearchBar'

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

  const handlePokemonClick = async (name: string) => router.push('/' + name)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)

  const handleSetCategory = (category: string) => setCategory(category)

  return (
    <div>
      <div className='grid grid-cols-3 p-2'>
        <SearchBarDropDown
          onChange={handleSetCategory}
          label={category ?? 'category'}
          categories={['pokemon', 'region']}
        />
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

      <div className='flex justify-around'>
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
    </div>
  )
}
