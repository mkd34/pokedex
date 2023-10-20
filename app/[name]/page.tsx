'use client'

import { useEffect, useState } from 'react'
import { ShinyToggle } from '../components'
import {
  PokemonCardDetailed,
  PokemonCardDetailedStats,
  PokemonCardFlavorText2,
} from '../components/PokemonCardDetailed'
import { Pokemon } from '../types'

export type Types = {
  slot?: number
  type?: {
    name?: string
    url?: string
  }
}

export type Games = {
  game_index: number
  version: {
    name: string
    url: string
  }
}

export type VersionDetails = {
  rarity: number
  version: {
    name: string
    url: string
  }
}

export type Versions = {
  item: {
    name: string
    url: string
  }
  version_details: VersionDetails[]
}

export type PokemonDetailedResponse = {
  name?: string
  id?: number
  url?: string
  height?: number
  weight?: number
  types?: Types[]
  game_indices?: Games[]
  held_items?: Versions[]
}

export type FlavorText = {
  flavor_text: string
  language: {
    name: string
    url: string
  }
  version: {
    name: string
    url: string
  }
}

export type PokedexEntry = {
  entry_number: number
  pokedex: {
    name: string
    url: string
  }
}

export type PokemonSpeciesResponse = {
  flavor_text_entries: FlavorText[]
  pokedex_numbers: PokedexEntry[]
}

const getPokemon = async (name: string) => {
  const url = 'https://pokeapi.co/api/v2/pokemon/' + name
  const response = await fetch(url)
  const data = (await response.json()) as Pokemon
  return data
}

const getSpecies = async (name: string) => {
  const url = 'https://pokeapi.co/api/v2/pokemon-species/' + name
  const response = await fetch(url)
  const data = (await response.json()) as PokemonSpeciesResponse
  return data
}

export default function Page({ params }: { params: { name: string } }) {
  const [showShiny, setShowShiny] = useState(false)
  const [dex, setDex] = useState('red')
  const [data, setData] = useState<PokemonDetailedResponse>()
  const [dataSpecies, setDataSpecies] = useState<PokemonSpeciesResponse>()

  let type_array: string[] = []

  const childToParent = (childData: string) => {
    setDex(childData)
  }

  useEffect(() => {
    getPokemon(params.name).then((pokemon) => setData(pokemon))
  }, [params.name])

  useEffect(() => {
    getSpecies(params.name).then((species) => setDataSpecies(species))
  }, [params.name])

  data?.types?.map((types, i) => {
    return type_array.push(types.type?.name as string)
  })

  return (
    <div className='p-3'>
      <div className='bg-slate-700 rounded-lg drop-shadow-sm grid grid-cols-2 w-96 z-0 p-2'>
        <div className='relative'>
          <PokemonCardDetailed
            name={params.name}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              showShiny ? 'shiny/' : ''
            }${data?.id}.png`}
            type_array={type_array}
          />
          <div className='absolute bottom-7 left-2'>
            <ShinyToggle isOn={showShiny} onToggle={() => setShowShiny(!showShiny)} />
          </div>
        </div>
        <div className='text-slate-50 px-2'>
          {/* {dataSpecies?.flavor_text_entries.map((flavor, i) => {
            if (flavor.language.name.includes('en') && flavor.version.name === dex) {
              return <PokemonCardFlavorText key={flavor.flavor_text} flavor_text={flavor.flavor_text} />
            }
          })} */}
          <PokemonCardFlavorText2 pokemon_list={dataSpecies} pokemon={data} />
          <PokemonCardDetailedStats height={data?.height} weight={data?.weight} />
        </div>
      </div>
    </div>
  )
}
