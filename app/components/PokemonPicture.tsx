import { useEffect, useState } from 'react'
import { PokemonDetailedResponse } from '../[name]/page'
import { Pokemon } from '../types'

type PokemonPictureProps = {
  url?: string
}

const getPokemon = async (name: string) => {
  const url = 'https://pokeapi.co/api/v2/pokemon/' + name
  const response = await fetch(url)
  const data = (await response.json()) as Pokemon
  return data
}

export const PokemonPicture = (url: string) => {
  const [data, setData] = useState<PokemonDetailedResponse>()

  useEffect(() => {
    getPokemon(url).then((picture) => setData(picture))
  }, [url])
  return
}
