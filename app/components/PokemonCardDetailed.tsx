import {
  Ability,
  AbilityFlavorText,
  Pokemon,
  PokemonAbility,
  PokemonSpecies,
  UtilityClient,
  VerboseEffect,
} from 'pokenode-ts'
import { ChangeEvent, useEffect, useState } from 'react'
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

export const PokemonCardDetailed = (pokemon: PokemonCardDetailedProps) => {
  let type_color_1: string = getTypeColor(pokemon.type_array?.[0]) + ' h-fit w-fit font-mono'
  let type_color_2: string = getTypeColor(pokemon.type_array?.[1]) + ' h-fit w-fit font-mono'

  return (
    <div className='px-4'>
      <div className='flex'>
        <div className='text-2xl text-slate-50 font-mono'>{pokemon.name}</div>
        <div className='flex justify-start ml-3 gap-1'>
          <div className={type_color_1}>{pokemon.type_array?.[0]}</div>
          <div className={`${type_color_2} ${pokemon.type_array?.[1] ? 'visible' : 'invisible w-0'}`}>
            {pokemon.type_array?.[1] ?? 'none'}
          </div>

          <div className='text-xs text-slate-100 font-mono grid grid-rows-2 justify-end'>
            <div>{pokemon.height ? (pokemon.height * 0.1).toFixed(1) : 0} m</div>
            <div>{pokemon.weight ? (pokemon.weight * 0.1).toFixed(1) : 0} kg</div>
          </div>
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

export const PokemonCardFlavorText3 = (pokemonData: PokemonCardFlavorText3Props) => {
  const [showShiny, setShowShiny] = useState(false)
  const [shinyUrl, setShinyUrl] = useState<string>()
  const [flavorText, setFlavorText] = useState<string>()
  const [spriteUrl, setSpriteUrl] = useState<string>()
  const [dex, setDex] = useState<string>()
  let filteredText: FlavorText[] | undefined

  const handleDexSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setDex(e.target.value)
    filteredText = pokemonData.my_pokemon?.flavor_text_entries
      .filter((value: FlavorText) => value.version.name === e.target.value)
      .filter((value: FlavorText) => value.language.name.includes('en'))
    setFlavorText(filteredText?.at(0)?.flavor_text.replace('\f', ' '))

    // TO DO: come up with a smarter way to handle shiny sprites...
    switch (e.target.value) {
      case 'red':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-i']['red-blue'].front_transparent ?? undefined)
        setShinyUrl(undefined)
        setShowShiny(false)
        break
      case 'blue':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-i']['red-blue'].front_transparent ?? undefined)
        setShinyUrl(undefined)
        setShowShiny(false)
        break
      case 'yellow':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-i']['yellow'].front_transparent ?? undefined)
        setShinyUrl(undefined)
        setShowShiny(false)
        break
      case 'crystal':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-ii']['crystal'].front_transparent ?? undefined)
        setShinyUrl(
          pokemonData.pokemon?.sprites.versions['generation-ii']['crystal'].front_shiny_transparent ?? undefined
        )
        break
      case 'gold':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-ii']['gold'].front_default ?? undefined)
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-ii']['gold'].front_shiny ?? undefined)
        break
      case 'silver':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-ii']['silver'].front_default ?? undefined)
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-ii']['silver'].front_shiny ?? undefined)
        break
      case 'emerald':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-iii']['emerald'].front_default ?? undefined)
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-iii']['emerald'].front_shiny ?? undefined)
        break
      case 'firered':
        setSpriteUrl(
          pokemonData.pokemon?.sprites.versions['generation-iii']['firered-leafgreen'].front_default ?? undefined
        )
        setShinyUrl(
          pokemonData.pokemon?.sprites.versions['generation-iii']['firered-leafgreen'].front_shiny ?? undefined
        )
        break
      case 'leafgreen':
        setSpriteUrl(
          pokemonData.pokemon?.sprites.versions['generation-iii']['firered-leafgreen'].front_default ?? undefined
        )
        setShinyUrl(
          pokemonData.pokemon?.sprites.versions['generation-iii']['firered-leafgreen'].front_shiny ?? undefined
        )
        break
      case 'ruby':
        setSpriteUrl(
          pokemonData.pokemon?.sprites.versions['generation-iii']['ruby-sapphire'].front_default ?? undefined
        )
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-iii']['ruby-sapphire'].front_shiny ?? undefined)
        break
      case 'sapphire':
        setSpriteUrl(
          pokemonData.pokemon?.sprites.versions['generation-iii']['ruby-sapphire'].front_default ?? undefined
        )
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-iii']['ruby-sapphire'].front_shiny ?? undefined)
        break
      case 'diamond':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-iv']['diamond-pearl'].front_default ?? undefined)
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-iv']['diamond-pearl'].front_shiny ?? undefined)
        break
      case 'pearl':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-iv']['diamond-pearl'].front_default ?? undefined)
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-iv']['diamond-pearl'].front_shiny ?? undefined)
        break
      case 'heartgold':
        setSpriteUrl(
          pokemonData.pokemon?.sprites.versions['generation-iv']['heartgold-soulsilver'].front_default ?? undefined
        )
        setShinyUrl(
          pokemonData.pokemon?.sprites.versions['generation-iv']['heartgold-soulsilver'].front_shiny ?? undefined
        )
        break
      case 'soulsilver':
        setSpriteUrl(
          pokemonData.pokemon?.sprites.versions['generation-iv']['heartgold-soulsilver'].front_default ?? undefined
        )
        setShinyUrl(
          pokemonData.pokemon?.sprites.versions['generation-iv']['heartgold-soulsilver'].front_shiny ?? undefined
        )
        break
      case 'platinum':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-iv']['platinum'].front_default ?? undefined)
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-iv']['platinum'].front_shiny ?? undefined)
        break
      case 'black':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-v']['black-white'].front_default ?? undefined)
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-v']['black-white'].front_shiny ?? undefined)
        break
      case 'white':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-v']['black-white'].front_default ?? undefined)
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-v']['black-white'].front_shiny ?? undefined)
        break
      case 'omegaruby':
        setSpriteUrl(
          pokemonData.pokemon?.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_default ?? undefined
        )
        setShinyUrl(
          pokemonData.pokemon?.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_shiny ?? undefined
        )
        break
      case 'alphasapphire':
        setSpriteUrl(
          pokemonData.pokemon?.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_default ?? undefined
        )
        setShinyUrl(
          pokemonData.pokemon?.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_shiny ?? undefined
        )
        break
      case 'x':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-vi']['x-y'].front_default ?? undefined)
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-vi']['x-y'].front_shiny ?? undefined)
        break
      case 'y':
        setSpriteUrl(pokemonData.pokemon?.sprites.versions['generation-vi']['x-y'].front_default ?? undefined)
        setShinyUrl(pokemonData.pokemon?.sprites.versions['generation-vi']['x-y'].front_shiny ?? undefined)
        break
      case 'ultra-sun':
        setSpriteUrl(
          pokemonData.pokemon?.sprites.versions['generation-vii']['ultra-sun-ultra-moon'].front_default ?? undefined
        )
        setShinyUrl(
          pokemonData.pokemon?.sprites.versions['generation-vii']['ultra-sun-ultra-moon'].front_shiny ?? undefined
        )
        break
      case 'ultra-moon':
        setSpriteUrl(
          pokemonData.pokemon?.sprites.versions['generation-vii']['ultra-sun-ultra-moon'].front_default ?? undefined
        )
        setShinyUrl(
          pokemonData.pokemon?.sprites.versions['generation-vii']['ultra-sun-ultra-moon'].front_shiny ?? undefined
        )
        break
      default:
        setSpriteUrl(pokemonData.pokemon?.sprites.other?.home.front_default ?? undefined)
        setShinyUrl(pokemonData.pokemon?.sprites.other?.home.front_shiny ?? undefined)
        break
    }
  }

  return (
    <div>
      <div className='px-2'>
        <select name='dexes' id='dexes' onChange={(e) => handleDexSelect(e)} className='text-slate-900 bg-slate-50'>
          {pokemonData.my_pokemon?.flavor_text_entries
            .filter((value: FlavorText) => value.language.name.includes('en'))
            .map((entry, i) => (
              <option value={entry.version.name} key={entry.version.name}>
                {entry.version.name}
              </option>
            ))}
        </select>
      </div>
      <div className='grid grid-cols-3 gap-1'>
        <div className='grid col-span-1 mt-2 p-1 h-fit'>
          <img
            src={showShiny ? shinyUrl : spriteUrl ?? pokemonData.pokemon?.sprites.front_default ?? undefined}
            alt={pokemonData.pokemon?.name}
            className='bg-slate-900 w-40 border-2 border-slate-300 rounded-lg drop-shadow-sm'
          />
          <div className={`flex justify-start mt-1 ${shinyUrl != undefined ? 'visible' : 'invisible'}`}>
            <ShinyToggle isOn={showShiny} onToggle={() => setShowShiny(!showShiny)} />
          </div>
        </div>
        <div className='mt-2 font-mono grid col-span-2'>
          {flavorText ??
            pokemonData.my_pokemon?.flavor_text_entries
              .filter((text: FlavorText) => text.language.name.includes('en'))
              .at(0)
              ?.flavor_text.replace('\f', ' ')}
        </div>
      </div>
      <div className='bg-slate-600 rounded-lg w-fit px-1 py-2'>
        <div className='text-base font-mono ml-2'>abilities</div>
        {pokemonData.pokemon?.abilities.map((ability, i) => {
          return <AbilityBlock ability={ability} game={dex ?? 'red'} key={ability.ability.url} />
        })}
      </div>
    </div>
  )
}

export type AbilityBlockProps = {
  ability: PokemonAbility
  game: string
  key: React.Key
}

const api = new UtilityClient()

export const AbilityBlock = ({ ability, game }: AbilityBlockProps) => {
  const [data, setData] = useState<Ability>()
  useEffect(() => {
    api.getResourceByUrl(ability.ability.url).then((pokemon) => setData(pokemon as Ability))
  })
  let effect_entries_filtered = data?.effect_entries.filter((value: VerboseEffect) => value.language.name.match('en'))
  let flavor_text_entries_filtered = data?.flavor_text_entries
    .filter((value: AbilityFlavorText) => value.language.name.match('en'))
    .filter((value: AbilityFlavorText) => value.version_group.name.match(game))

  return (
    <div className='inline-block p-1 not-italic font-mono w-56'>
      <div className='bg-slate-400 max-w-prose inline-block px-3 py-1 rounded-lg drop-shadow-sm'>
        <div>
          <div className='inline text-lg text-slate-900'>{ability.ability.name}</div>
          <div className='inline italic text-xs'>{ability.is_hidden ? ' hidden' : ''}</div>
        </div>
        <div className=''>{flavor_text_entries_filtered?.at(0)?.flavor_text}</div>
      </div>
    </div>
  )
}
