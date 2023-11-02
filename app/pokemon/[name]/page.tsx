'use client'

import { MainClient, Pokemon, PokemonSpecies } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import { PokemonCardDetailed } from '../../components/PokemonCardDetailed'

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

const getPokemonSpecies = async (name: string) => {
  const url = 'https://pokeapi.co/api/v2/pokemon-species/' + name
  const response = await fetch(url)
  const data = (await response.json()) as PokemonSpeciesResponse
  return data
}

const api = new MainClient()

export default function Page({ params }: { params: { name: string } }) {
  const [showShiny, setShowShiny] = useState(false)
  const [data, setData] = useState<Pokemon>()
  const [myData, setMyData] = useState<PokemonSpeciesResponse>()
  const [dataSpecies, setDataSpecies] = useState<PokemonSpecies>()

  let type_array: string[] = []

  useEffect(() => {
    api.pokemon.getPokemonByName(params.name).then((pokemon) => setData(pokemon))
  }, [params.name])

  useEffect(() => {
    api.pokemon.getPokemonSpeciesByName(params.name).then((species) => setDataSpecies(species))
  }, [params.name])

  useEffect(() => {
    getPokemonSpecies(params.name).then((pokemon) => setMyData(pokemon))
  }, [params.name])

  data?.types?.map((type) => {
    return type_array.push(type.type?.name as string)
  })

  return (
    <div className=''>
      <PokemonCardDetailed
        name={params.name}
        id={data?.id}
        type_array={type_array}
        pokemon_list={dataSpecies}
        pokemon={data}
        my_pokemon={myData}
        height={data?.height}
        weight={data?.weight}
      />
    </div>
  )
}
