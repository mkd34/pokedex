import { Pokemon, PokemonSpecies } from 'pokenode-ts'
import { ChangeEvent, useState } from 'react'
import { ShinyToggle } from '.'
import { FlavorText, PokemonSpeciesResponse } from '../[name]/page'

type PokemonCardDetailedProps = {
  name?: string
  image?: string
  height?: number
  weight?: number
  types?: string
  id?: number
  type_array?: string[]
  flavor_text?: string
  flavor_text_entries?: FlavorText[]
  key?: React.Key
  pokemon_list?: PokemonSpecies
  pokemon?: Pokemon
  my_pokemon?: PokemonSpeciesResponse
}

type PokemonCardFlavorText3Props = {
  pokemon_list?: PokemonSpecies
  pokemon?: Pokemon
  my_pokemon?: PokemonSpeciesResponse
}

type DexButtonsProps = {
  key?: React.Key
  pokedex_name: string
  childToParent: Function
}

export const PokemonCardDetailed = (pokemon: PokemonCardDetailedProps) => {
  const [showShiny, setShowShiny] = useState(false)

  let type_color_1: string = getTypeColor(pokemon.type_array?.[0]) + ' h-fit w-fit font-mono'
  let type_color_2: string = getTypeColor(pokemon.type_array?.[1]) + ' h-fit w-fit font-mono'

  return (
    <div className='px-4'>
      <div className='flex'>
        <div className='text-2xl text-slate-50 font-mono'>{pokemon.name}</div>
        <div className='flex justify-start ml-3 gap-1'>
          <div className={type_color_1}>{pokemon.type_array?.[0]}</div>
          <div className={type_color_2}>{pokemon.type_array?.[1] ?? 'none'}</div>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-2'>
        <div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              showShiny ? 'shiny/' : ''
            }${pokemon.id}.png`}
            alt={pokemon.name}
            className='bg-slate-900 w-40 border-2 border-slate-300 rounded-lg drop-shadow-sm'
          />
          <div className='mt-2'>
            <ShinyToggle isOn={showShiny} onToggle={() => setShowShiny(!showShiny)} />
          </div>
        </div>

        <div className='bg-slate-800 border-2 border-slate-500 italic text-sm text-slate-50 rounded-lg h-max max-w-prose p-4 grid col-span-2 justify-start drop-shadow-sm'>
          <PokemonCardFlavorText3
            pokemon_list={pokemon.pokemon_list}
            pokemon={pokemon.pokemon}
            my_pokemon={pokemon.my_pokemon}
          />
        </div>
      </div>
    </div>
  )
}

export const getTypeColor = (type: string | undefined) => {
  switch (type) {
    case 'grass':
      return 'text-sm text-green-900 bg-green-500 drop-shadow-sm rounded p-0.5'
      break
    case 'poison':
      return 'text-sm text-fuchsia-200 bg-fuchsia-700 drop-shadow-sm rounded p-0.5'
      break
    case 'fire':
      return 'text-sm text-orange-200 bg-orange-500 drop-shadow-sm rounded p-1'
      break
    case 'water':
      return 'text-sm text-blue-200 bg-blue-500 drop-shadow-sm rounded p-1'
      break
    case 'bug':
      return 'text-sm text-lime-100 bg-lime-500 drop-shadow-sm rounded p-1'
      break
    case 'flying':
      return 'text-sm text-violet-200 bg-violet-500 drop-shadow-sm rounded p-1'
      break
    case 'electric':
      return 'text-sm text-yellow-100 bg-yellow-500 drop-shadow-sm rounded p-1'
      break
    case 'fairy':
      return 'text-sm text-pink-100 bg-pink-400 drop-shadow-sm rounded p-1'
      break
    case 'psychic':
      return 'text-sm text-pink-200 bg-pink-600 drop-shadow-sm rounded p-1'
      break
    case 'dark':
      return 'text-sm text-stone-300 bg-stone-800 drop-shadow-sm rounded p-1'
      break
    case 'steel':
      return 'text-sm text-indigo-700 bg-indigo-300 drop-shadow-sm rounded p-1'
      break
    case 'rock':
      return 'text-sm text-amber-200 bg-amber-700 drop-shadow-sm rounded p-1'
      break
    case 'fighting':
      return 'text-sm text-rose-300 bg-rose-800 drop-shadow-sm rounded p-1'
      break
    default:
      return 'text-sm text-stone-200 bg-stone-500 drop-shadow-sm rounded p-1'
      break
  }
}

export const PokemonCardDetailedStats = (pokemon: PokemonCardDetailedProps) => {
  return (
    <div className='grid grid-cols-2 text-slate-300 gap-4 py-2 text-sm'>
      <div className='grid grid-rows-2'>
        <h1 className=''>height:</h1>
        <h1 className='text-slate-100'>{pokemon.height} dm</h1>
      </div>
      <div className='grid grid-rows-2'>
        <h1 className=''>weight:</h1>
        <h1 className='text-slate-100'>{pokemon.weight} hg</h1>
      </div>
    </div>
  )
}

export const PokemonCardFlavorText = (text: PokemonCardDetailedProps) => {
  return <div className='italic text-base'>{text.flavor_text?.replace('\f', ' ')}</div>
}

export const PokemonCardFlavorText3 = (pokemonData: PokemonCardFlavorText3Props) => {
  const [flavorText, setFlavorText] = useState<string>()
  let filteredText: FlavorText[] | undefined

  const handleDexClick = (e: ChangeEvent<HTMLSelectElement>) => {
    filteredText = pokemonData.my_pokemon?.flavor_text_entries
      .filter((value: FlavorText) => value.version.name === e.target.value)
      .filter((value: FlavorText) => value.language.name.includes('en'))
    setFlavorText(filteredText?.at(0)?.flavor_text.replace('\f', ' '))
  }

  return (
    <div>
      <select name='dexes' id='dexes' onChange={(e) => handleDexClick(e)} className='text-slate-900 bg-slate-50'>
        {pokemonData.my_pokemon?.flavor_text_entries
          .filter((value: FlavorText) => value.language.name.includes('en'))
          .map((entry, i) => (
            <option value={entry.version.name} key={entry.version.name}>
              {entry.version.name}
            </option>
          ))}
      </select>
      <div className='mt-2 font-mono'>
        {flavorText ??
          pokemonData.my_pokemon?.flavor_text_entries
            .filter((text: FlavorText) => text.language.name.includes('en'))
            .at(0)
            ?.flavor_text.replace('\f', ' ')}
      </div>
    </div>
  )
}
