import { useRouter } from 'next/navigation'
import {
  Ability,
  AbilityFlavorText,
  Move,
  MoveClient,
  MoveFlavorText,
  Pokemon,
  PokemonAbility,
  PokemonMove,
  PokemonMoveVersion,
  PokemonSpecies,
  UtilityClient,
} from 'pokenode-ts'
import { ChangeEvent, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { ShinyToggle } from '.'
import { FlavorText, PokemonSpeciesResponse } from '../[name]/page'
import { getTypeIconFormat } from '../util/FormatUtilities'

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
  game?: string
  flavor_text?: string
  sprite_url?: string
  shiny_url?: string
  show_shiny: boolean
}

export const PokemonCardDetailed = (pokemon: PokemonCardDetailedProps) => {
  const [showShiny, setShowShiny] = useState(false)
  const [shinyUrl, setShinyUrl] = useState<string>()
  const [flavorText, setFlavorText] = useState<string>()
  const [spriteUrl, setSpriteUrl] = useState<string>()
  const [dex, setDex] = useState<string>()
  let filteredText: FlavorText[] | undefined

  const handleDexSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setDex(e.target.value)
    filteredText = pokemon.my_pokemon?.flavor_text_entries
      .filter((value: FlavorText) => value.version.name === e.target.value)
      .filter((value: FlavorText) => value.language.name.includes('en'))
    setFlavorText(filteredText?.at(0)?.flavor_text.replace('\f', ' '))

    // TO DO: come up with a smarter way to handle shiny sprites...
    switch (e.target.value) {
      case 'red':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-i']['red-blue'].front_transparent ?? undefined)
        setShinyUrl(undefined)
        setShowShiny(false)
        break
      case 'blue':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-i']['red-blue'].front_transparent ?? undefined)
        setShinyUrl(undefined)
        setShowShiny(false)
        break
      case 'yellow':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-i']['yellow'].front_transparent ?? undefined)
        setShinyUrl(undefined)
        setShowShiny(false)
        break
      case 'crystal':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-ii']['crystal'].front_transparent ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-ii']['crystal'].front_shiny_transparent ?? undefined)
        break
      case 'gold':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-ii']['gold'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-ii']['gold'].front_shiny ?? undefined)
        break
      case 'silver':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-ii']['silver'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-ii']['silver'].front_shiny ?? undefined)
        break
      case 'emerald':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-iii']['emerald'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-iii']['emerald'].front_shiny ?? undefined)
        break
      case 'firered':
        setSpriteUrl(
          pokemon.pokemon?.sprites.versions['generation-iii']['firered-leafgreen'].front_default ?? undefined
        )
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-iii']['firered-leafgreen'].front_shiny ?? undefined)
        break
      case 'leafgreen':
        setSpriteUrl(
          pokemon.pokemon?.sprites.versions['generation-iii']['firered-leafgreen'].front_default ?? undefined
        )
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-iii']['firered-leafgreen'].front_shiny ?? undefined)
        break
      case 'ruby':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-iii']['ruby-sapphire'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-iii']['ruby-sapphire'].front_shiny ?? undefined)
        break
      case 'sapphire':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-iii']['ruby-sapphire'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-iii']['ruby-sapphire'].front_shiny ?? undefined)
        break
      case 'diamond':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-iv']['diamond-pearl'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-iv']['diamond-pearl'].front_shiny ?? undefined)
        break
      case 'pearl':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-iv']['diamond-pearl'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-iv']['diamond-pearl'].front_shiny ?? undefined)
        break
      case 'heartgold':
        setSpriteUrl(
          pokemon.pokemon?.sprites.versions['generation-iv']['heartgold-soulsilver'].front_default ?? undefined
        )
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-iv']['heartgold-soulsilver'].front_shiny ?? undefined)
        break
      case 'soulsilver':
        setSpriteUrl(
          pokemon.pokemon?.sprites.versions['generation-iv']['heartgold-soulsilver'].front_default ?? undefined
        )
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-iv']['heartgold-soulsilver'].front_shiny ?? undefined)
        break
      case 'platinum':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-iv']['platinum'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-iv']['platinum'].front_shiny ?? undefined)
        break
      case 'black':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-v']['black-white'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-v']['black-white'].front_shiny ?? undefined)
        break
      case 'white':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-v']['black-white'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-v']['black-white'].front_shiny ?? undefined)
        break
      case 'omegaruby':
        setSpriteUrl(
          pokemon.pokemon?.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_default ?? undefined
        )
        setShinyUrl(
          pokemon.pokemon?.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_shiny ?? undefined
        )
        break
      case 'alphasapphire':
        setSpriteUrl(
          pokemon.pokemon?.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_default ?? undefined
        )
        setShinyUrl(
          pokemon.pokemon?.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_shiny ?? undefined
        )
        break
      case 'x':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-vi']['x-y'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-vi']['x-y'].front_shiny ?? undefined)
        break
      case 'y':
        setSpriteUrl(pokemon.pokemon?.sprites.versions['generation-vi']['x-y'].front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.versions['generation-vi']['x-y'].front_shiny ?? undefined)
        break
      case 'ultra-sun':
        setSpriteUrl(
          pokemon.pokemon?.sprites.versions['generation-vii']['ultra-sun-ultra-moon'].front_default ?? undefined
        )
        setShinyUrl(
          pokemon.pokemon?.sprites.versions['generation-vii']['ultra-sun-ultra-moon'].front_shiny ?? undefined
        )
        break
      case 'ultra-moon':
        setSpriteUrl(
          pokemon.pokemon?.sprites.versions['generation-vii']['ultra-sun-ultra-moon'].front_default ?? undefined
        )
        setShinyUrl(
          pokemon.pokemon?.sprites.versions['generation-vii']['ultra-sun-ultra-moon'].front_shiny ?? undefined
        )
        break
      default:
        setSpriteUrl(pokemon.pokemon?.sprites.other?.home.front_default ?? undefined)
        setShinyUrl(pokemon.pokemon?.sprites.other?.home.front_shiny ?? undefined)
        break
    }
  }

  let type_color_1: string =
    getTypeColor(pokemon.type_array?.[0]) + ' h-fit w-fit font-mono text-xs sm:text-lg lg:text-2xl'
  let type_color_2: string =
    getTypeColor(pokemon.type_array?.[1]) + ' h-fit w-fit font-mono text-xs sm:text-lg lg:text-2xl'

  return (
    <div className=''>
      <div className='flex justify-stretch pl-2 pt-2 bg-slate-700'>
        <div className='text-xs sm:text-xl lg:text-2xl text-slate-50 font-mono'>{pokemon.name}</div>
        <div className='flex justify-start ml-3 gap-1'>
          <div className={type_color_1}>{pokemon.type_array?.[0]}</div>
          <div className={`${type_color_2} ${pokemon.type_array?.[1] ? 'visible' : 'invisible w-0'}`}>
            {pokemon.type_array?.[1] ?? 'none'}
          </div>

          <div className='text-xs sm:text-sm lg:text-base text-slate-100 font-mono justify-end'>
            <div>{pokemon.height ? (pokemon.height * 0.1).toFixed(1) : 0} m</div>
            <div>{pokemon.weight ? (pokemon.weight * 0.1).toFixed(1) : 0} kg</div>
          </div>
        </div>
        <select
          name='dexes'
          id='dexes'
          onChange={(e) => handleDexSelect(e)}
          className='text-slate-900 bg-slate-50 text-xs sm:text-sm lg:text-lg ml-2 '
        >
          {pokemon.my_pokemon?.flavor_text_entries
            .filter((value: FlavorText) => value.language.name.includes('en'))
            .map((entry, i) => (
              <option value={entry.version.name} key={entry.version.name}>
                {entry.version.name}
              </option>
            ))}
        </select>
      </div>
      <div className='italic text-sm text-slate-50 rounded-lg h-max grid col-span-2 justify-start drop-shadow-sm'>
        <PokemonCardFlavorText3
          pokemon_list={pokemon.pokemon_list}
          pokemon={pokemon.pokemon}
          my_pokemon={pokemon.my_pokemon}
          game={dex}
          flavor_text={flavorText}
          sprite_url={spriteUrl}
          shiny_url={shinyUrl}
          show_shiny={showShiny}
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
export const getTypeBgColor = (type: string | undefined) => {
  switch (type) {
    case 'grass':
      return 'bg-green-500'
      break
    case 'poison':
      return 'bg-fuchsia-700'
      break
    case 'fire':
      return 'bg-orange-500'
      break
    case 'water':
      return 'bg-blue-500'
      break
    case 'bug':
      return 'bg-lime-500'
      break
    case 'flying':
      return 'bg-violet-500'
      break
    case 'electric':
      return 'bg-yellow-500'
      break
    case 'fairy':
      return 'bg-pink-400'
      break
    case 'psychic':
      return 'bg-pink-600'
      break
    case 'dark':
      return 'bg-stone-800'
      break
    case 'steel':
      return 'bg-indigo-300'
      break
    case 'rock':
      return 'bg-amber-700'
      break
    case 'fighting':
      return 'bg-rose-800'
      break
    default:
      return 'bg-stone-500'
      break
  }
}

export const PokemonCardFlavorText3 = (pokemonData: PokemonCardFlavorText3Props) => {
  const [showShiny, setShowShiny] = useState(false)
  return (
    <div className='grid grid-rows-4 lg:grid-cols-2 h-screen w-screen'>
      <div className='border-slate-700 border-2 drop-shadow-sm z-0 p-2 h-fit sm:row-span-1 w-fit'>
        <div className='px-2'></div>
        <div className='grid grid-cols-4 gap-2'>
          <div className='grid col-span-1 mt-2 h-fit w-fit'>
            <img
              src={
                pokemonData.shiny_url && showShiny
                  ? pokemonData.shiny_url
                  : pokemonData.sprite_url ?? pokemonData.pokemon?.sprites.front_default ?? undefined
              }
              alt={pokemonData.pokemon?.name}
              className='bg-slate-900 w-40 border-2 border-slate-300 rounded-lg drop-shadow-sm'
            />
            <div className={`flex justify-start mt-1 ${pokemonData.shiny_url != undefined ? 'visible' : 'invisible'}`}>
              <ShinyToggle isOn={showShiny} onToggle={() => setShowShiny(!showShiny)} />
            </div>
          </div>
          <div className='col-span-3'>
            <div className='grid gap-3 mt-2 place-items-start'>
              <div className='p-2 font-mono max-w-prose h-fit rounded-lg bg-slate-700'>
                {pokemonData.flavor_text ??
                  pokemonData.my_pokemon?.flavor_text_entries
                    .filter((text: FlavorText) => text.language.name.includes('en'))
                    .at(0)
                    ?.flavor_text.replace('\f', ' ')}
              </div>
              <div className='bg-slate-700 rounded-lg px-1 py-2 max-w-prose'>
                <div className='text-base font-mono ml-2'>abilities</div>
                {pokemonData.pokemon?.abilities.map((ability, i) => {
                  return (
                    <AbilityBlock
                      ability={ability}
                      game={pokemonData.game ?? pokemonData.pokemon?.game_indices.at(0)?.version.name}
                      key={ability.ability.url}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <MovesTray pokemon={pokemonData.pokemon} game={pokemonData.game ?? 'red'} />
      </div>
    </div>
  )
}

export type MovesTrayProps = {
  game: string | undefined
  pokemon: Pokemon | undefined
}

export const MovesTray = ({ game, pokemon }: MovesTrayProps) => {
  return (
    <div>
      <div className='drawer lg:drawer-open lg:place-content-end'>
        <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col place-items-start'>
          <label
            htmlFor='my-drawer-2'
            className='inline-flex lg:hidden w-24 h-10 bg-slate-800 border-2 border-slate-600 rounded-md text-slate-100 items-center justify-center font-mono hover:bg-slate-500 hover:cursor-pointer hover:border-pink-500'
          >
            moves
          </label>
        </div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer-2' aria-label='close sidebar' className='drawer-overlay'></label>
          <div className='menu p-4 flex-auto lg:max-w-xl sm:max-w-xl max-w-prose min-h-full bg-slate-800 text-base-content'>
            <div className='grid grid-cols-2'>
              <div className='text-sm sm:text-base lg:text-lg not-italic font-mono'>pokemon {game} moves</div>
              <div className='inline-flex justify-end'>
                <label
                  htmlFor='my-drawer-2'
                  aria-label='close sidebar'
                  className='lg:hidden text-pink-500 text-lg hover:text-slate-50 hover:cursor-pointer w-fit'
                >
                  <AiOutlineClose />
                </label>
              </div>
            </div>
            <a>
              <MoveBlock pokemon={pokemon} game={game ?? 'red'} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export type MoveBlockProps = {
  game: string | undefined
  pokemon: Pokemon | undefined
}

export const MoveBlock = ({ game, pokemon }: MoveBlockProps) => {
  const pokemonMoves: string[] = []
  pokemon?.moves.forEach((value: PokemonMove) => {
    if (
      value.version_group_details.filter((value: PokemonMoveVersion) =>
        value.version_group.name.includes(game as string)
      ).length > 0
    ) {
      pokemonMoves.push(value.move.name)
    }
  })
  return (
    <div className=''>
      <div className=''>
        {pokemonMoves?.map((value, i) => {
          return <MovesBlocksEach move={value} key={value} />
        })}
      </div>
    </div>
  )
}

export type MovesBlockEachProps = {
  move: string
  key: React.Key
}

const movesApi = new MoveClient()
export const MovesBlocksEach = ({ move }: MovesBlockEachProps) => {
  const [data, setData] = useState<Move>()
  useEffect(() => {
    movesApi.getMoveByName(move).then((pokemon) => setData(pokemon as Move))
  })
  let flavor_text_filtered = data?.flavor_text_entries.filter((value: MoveFlavorText) =>
    value.language.name.includes('en')
  )
  const typeColor = getTypeIconFormat(data?.type.name)

  const router = useRouter()
  const handleMoveClick = async (name: string) => router.push('/moves/' + name)
  return (
    <div className='p-1 inline-block' onClick={() => handleMoveClick(move)}>
      <div
        className={`border-2 ${typeColor} border-slate-800 text-slate-600 p-2 max-w-sm rounded-lg drop-shadow-sm hover:cursor-pointer hover:border-2 hover:border-pink-500`}
      >
        <div>{move}</div>
        <div>{flavor_text_filtered?.at(0)?.flavor_text}</div>
      </div>
    </div>
  )
}

export type AbilityBlockProps = {
  ability: PokemonAbility
  game: string | undefined
  key: React.Key
}

export const AbilityBlock = ({ ability, game }: AbilityBlockProps) => {
  const api = new UtilityClient()
  const [data, setData] = useState<Ability>()
  useEffect(() => {
    api.getResourceByUrl(ability.ability.url).then((pokemon) => setData(pokemon as Ability))
  })
  let flavor_text_entries_filtered = data?.flavor_text_entries
    .filter((value: AbilityFlavorText) => value.language.name.match('en'))
    .filter((value: AbilityFlavorText) => value.version_group.name.match(game as string))

  return (
    <div className='inline-block p-1 not-italic font-mono'>
      <div className='bg-slate-400 px-3 py-1 rounded-lg drop-shadow-sm'>
        <div>
          <div className='inline text-sm text-slate-900'>{ability.ability.name}</div>
          <div className='inline italic text-xs'>{ability.is_hidden ? ' hidden' : ''}</div>
        </div>
        <div className='text-xs'>{flavor_text_entries_filtered?.at(0)?.flavor_text}</div>
      </div>
    </div>
  )
}
