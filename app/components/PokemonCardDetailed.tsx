import { useEffect, useState } from 'react'
import { FlavorText, PokemonDetailedResponse, PokemonSpeciesResponse } from '../[name]/page'

type PokemonCardDetailedProps = {
  name?: string
  image?: string
  height?: number
  weight?: number
  types?: string
  type_array?: string[]
  flavor_text?: string
  flavor_text_entries?: FlavorText[]
  key?: React.Key
}

type PokemonDataProps = {
  pokemon_list?: PokemonSpeciesResponse
  pokemon?: PokemonDetailedResponse
}

type DexButtonsProps = {
  key?: React.Key
  pokedex_name: string
  childToParent: Function
}

export const PokemonCardDetailed = (pokemon: PokemonCardDetailedProps) => {
  let type_color_1: string = getTypeColor(pokemon.type_array?.[0])
  let type_color_2: string = getTypeColor(pokemon.type_array?.[1])
  if (pokemon.type_array?.length === 2) {
    return (
      <div className='w-fit'>
        <div className='text-2xl text-slate-50'>{pokemon.name}</div>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className='bg-slate-900 w-40 border-2 border-slate-300 rounded-lg drop-shadow-sm'
        />
        <div className='flex justify-around'>
          <div className={type_color_1}>{pokemon.type_array?.[0]}</div>
          <div className={type_color_2}>{pokemon.type_array?.[1]}</div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='w-fit'>
        <div className='text-2xl text-slate-50'>{pokemon.name}</div>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className='bg-slate-900 w-40 border-2 border-slate-300 rounded-lg drop-shadow-sm'
        />
        <div className='flex justify-around'>
          <div className={type_color_1}>{pokemon.type_array?.[0]}</div>
        </div>
      </div>
    )
  }
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

export const PokemonCardFlavorText2 = (mydata: PokemonDataProps) => {
  const [dex, setDex] = useState('red')

  const childToParent = (childData: string) => {
    setDex(childData)
  }

  // to do: handle clicks of different game buttons

  //   console.log(mydata.pokemon?.held_items?.at(0)?.version_details.at(0)?.version.name)
  mydata.pokemon?.held_items?.forEach((value) => {
    value.version_details.forEach((value2) => {
      console.log(value2.version.name)
    })
  })

  return (
    <div className='grid grid-cols-2'>
      <div>
        {mydata?.pokemon_list?.flavor_text_entries?.map((flavor, i) => {
          if (flavor.language.name.includes('en') && flavor.version.name === dex) {
            return <PokemonCardFlavorText key={flavor.flavor_text} flavor_text={flavor.flavor_text} />
          }
        })}
      </div>
      <div className='grid grid-flow-row gap-2 text-slate-500'>
        {mydata?.pokemon?.game_indices?.map((dex, i) => {
          return <DexButtons key={dex.game_index} pokedex_name={dex.version.name} childToParent={childToParent} />
        })}
      </div>
      {/* {mydata?.pokemon?.held_items?.map((dex, i) => {
        return (
          <DexButtons
            key={dex.version_details.version?.name}
            pokedex_name={dex.version_details.version?.name}
            childToParent={childToParent}
          />
        )
      })} */}
    </div>
  )
}

export const DexButtons = (dex: DexButtonsProps) => {
  const [childData, setChildData] = useState<string>()

  useEffect(() => {
    dex.childToParent(childData)
  }, [childData])
  return (
    <div>
      <button
        className='bg-slate-100'
        onClick={() => {
          setChildData(dex.pokedex_name)
        }}
      >
        {' '}
        {dex.pokedex_name}
      </button>
    </div>
  )
}
