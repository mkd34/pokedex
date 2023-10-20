'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  const url = 'https://pokeapi.co/api/v2/pokemon-species/?limit=1020'
  const response = await fetch(url)
  const data = (await response.json()) as PokemonSpeciesResponse
  return data
}

// const getPokemonSpecies = async (id: number) => {
//   const url = 'https://pokeapi.co/api/v2/pokemon-species/' + id
//   const response = await fetch(url)
//   const data = (await response.json()) as PokemonSpeciesResponse
//   return data
// }

export default function Home() {
  const [data, setData] = useState<PokemonSpeciesResponse>()
  const [showShiny, setShowShiny] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [category, setCategory] = useState('select category')

  useEffect(() => {
    getAllPokemonSpecies().then((pokemon) => setData(pokemon))
  }, [])

  const router = useRouter()

  const handlePokemonClick = async (name: string) => {
    router.push('/' + name)
  }
  const handleSearchChange = (e: any) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  let searchResults: PokemonResults[] | undefined
  if (searchInput.length > 0) {
    searchResults = data?.results.filter((e) => {
      return e.name.includes(searchInput)
    })
  } else if (searchInput.length === 0) {
    searchResults = data?.results
  }

  const childToParent = (childData: string) => {
    setCategory(childData)
  }

  return (
    <div>
      <div className='flex justify-around'>
        <div className='grid grid-cols-4 z-20 py-5'>
          <div className='mt-auto grid col-span-1'>
            <SearchBarDropDown childToParent={childToParent} label={category} />
          </div>
          <input
            type='search'
            placeholder='type pokemon name'
            onChange={handleSearchChange}
            value={searchInput}
            className='grid col-span-2 h-9 p-2.5 z-20 text-sm border focus:ring-blue-500 bg-slate-700 border-slate-600 placeholder-slate-400 text-white focus:border-pink-500'
          />
          <div className='mt-auto px-2 grid col-span-1'>
            <ShinyToggle isOn={showShiny} onToggle={() => setShowShiny(!showShiny)} />
          </div>
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
                  .substring(pokemon.url.length - 4, pokemon.url.length - 1)
                  .replace('/', '')
                  .replace('s', '')}.png`}
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

// 'use client'

// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { PokemonCard, ShinyToggle } from './components'
// import { PokemonList, PokemonResponse } from './types'

// const getAllPokemon = async (name: string) => {
//   // const url = 'https://pokeapi.co/api/v2/pokemon?limit=150'
//   const url = 'https://pokeapi.co/api/v2/' + name
//   const response = await fetch(url)
//   const data = (await response.json()) as PokemonResponse
//   return data
// }

// const isBulbasaur = (value: PokemonList) => value.pokemon_species.name === 'bulbasaur'

// export default function Home() {
//   const [showShiny, setShowShiny] = useState(false)
//   const [search, setSearch] = useState<string>('pokedex/kanto')
//   const [data, setData] = useState<PokemonResponse>()

//   const childToParent = (childData: string) => {
//     setSearch(childData)
//   }

//   useEffect(() => {
//     getAllPokemon(search).then((pokemon) => setData(pokemon))
//   }, [search])

//   const router = useRouter()

//   const handlePokemonClick = async (name: string) => {
//     router.push('/' + name)
//   }

//   const bulbasaur = data?.pokemon_entries.filter(isBulbasaur)
//   return (
//     <div className='text-center text-3xl p-3 text-gray-50'>
//       my swagged out pokedex :)
//       <ShinyToggle isOn={showShiny} onToggle={() => setShowShiny(!showShiny)} />
//       <div className='grid grid-rows-2 h-20 gap-10 justify-center'>
//         {/* <div className='z-50 grid-cols-9'>
//           <DropDownButtonGen1 childToParent={childToParent} />
//           <DropDownButtonGen2 childToParent={childToParent} />
//           <DropDownButtonGen3 childToParent={childToParent} />
//           <DropDownButtonGen4 childToParent={childToParent} />
//           <DropDownButtonGen5 childToParent={childToParent} />
//           <DropDownButtonGen6 childToParent={childToParent} />
//           <DropDownButtonGen7 childToParent={childToParent} />
//           <DropDownButtonGen8 childToParent={childToParent} />
//           <DropDownButtonGen9 childToParent={childToParent} />
//         </div> */}
//         <div className=''>
//           <div className=''>
//             <div className='grid gap-10 grid-cols-6 w-fit'>
//               {bulbasaur?.map((pokemon, i) => {
//                 return (
//                   <PokemonCard
//                     pokemon={pokemon.pokemon_species.name}
//                     image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//                       showShiny ? 'shiny/' : ''
//                     }${pokemon.pokemon_species.url
//                       .substring(pokemon.pokemon_species.url.length - 4, pokemon.pokemon_species.url.length - 1)
//                       .replace('/', '')
//                       .replace('s', '')}.png`}
//                     key={pokemon.pokemon_species.name}
//                     onClick={() => handlePokemonClick(pokemon.pokemon_species.name)}
//                   />
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
