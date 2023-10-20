export type Pokemon = {
  name: string
  url?: string
  height?: number
  weight?: number
}

// export type PokemonResponse = {
//   count: number
//   next: string
//   previous: string
//   results: Pokemon[]
// }

export type PokemonResponse = {
  name: string
  pokemon_entries: PokemonList[]
}

export type PokemonList = {
  entry_number?: number
  pokemon_species: {
    name: string
    url: string
  }
}

export type PokemonDexEntry = {
  id: number
  name: string
}
