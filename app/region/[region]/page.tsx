'use client'

import { PokemonCard, ShinyToggle } from '@/app/components'
import { RegionalButtons } from '@/app/components/RegionalButtons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PokemonResponse } from '../../types'

const getRegionDex = async (region: string) => {
  const url = 'https://pokeapi.co/api/v2/pokedex/' + region
  const response = await fetch(url)
  const data = (await response.json()) as PokemonResponse
  return data
}

export default function Page({ params }: { params: { name: string } }) {
  const [showShiny, setShowShiny] = useState(false)
  const [data, setData] = useState<PokemonResponse>()
  const [region, setRegion] = useState(params.name)

  useEffect(() => {
    getRegionDex(region).then((pokemon) => setData(pokemon))
  }, [region])

  const router = useRouter()

  const handlePokemonClick = async (name: string) => {
    router.push('/' + name)
  }

  const handleRegionClick = async (name: string) => {
    router.push('/region/' + name)
  }

  return (
    <div className='text-center text-3xl p-3 text-gray-50'>
      my swagged out pokedex :)
      <ShinyToggle isOn={showShiny} onToggle={() => setShowShiny(!showShiny)} />
      <div className='grid grid-cols-[15vw_minmax(100vw,_1fr)_85vw] gap-7'>
        <div className='flex h-fit'>
          <div className='px-4'>
            <div className='px-2 text-left text-lg text-slate-300'>category</div>
            <div className='px-2 text-left text-base text-slate-400'>region</div>
            <div className='flex flex-wrap items-center w-fit px-3 py-2 border-slate-500 border-2 rounded-lg drop-shadow-sm'>
              <RegionalButtons
                onClick={() => {
                  setRegion('kanto')
                }}
                name='kanto'
              />
              <RegionalButtons
                onClick={() => {
                  setRegion('original-johto')
                }}
                name='johto'
              />
              <RegionalButtons
                onClick={() => {
                  setRegion('hoenn')
                }}
                name='hoenn'
              />
              <RegionalButtons
                onClick={() => {
                  setRegion('original-sinnoh')
                }}
                name='sinnoh'
              />
              <RegionalButtons
                onClick={() => {
                  setRegion('original-unova')
                }}
                name='unova'
              />
              <RegionalButtons
                onClick={() => {
                  setRegion('kalos-central')
                }}
                name='kalos'
              />
              <RegionalButtons
                onClick={() => {
                  setRegion('original-alola')
                }}
                name='alola'
              />
              <RegionalButtons
                onClick={() => {
                  setRegion('galar')
                }}
                name='galar'
              />
              <RegionalButtons
                onClick={() => {
                  setRegion('hisui')
                }}
                name='hisui'
              />
              <RegionalButtons
                onClick={() => {
                  setRegion('paldea')
                }}
                name='paldea'
              />
            </div>
          </div>
        </div>
        <div className=''>
          <div className=''>
            <div className='grid gap-10 grid-cols-6 w-fit'>
              {data?.pokemon_entries.map((pokemon, i) => {
                return (
                  <PokemonCard
                    pokemon={pokemon.pokemon_species.name}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      showShiny ? 'shiny/' : ''
                    }${pokemon.pokemon_species.url
                      .substring(pokemon.pokemon_species.url.length - 4, pokemon.pokemon_species.url.length - 1)
                      .replace('/', '')
                      .replace('s', '')}.png`}
                    key={pokemon.pokemon_species.name}
                    onClick={() => handlePokemonClick(pokemon.pokemon_species.name)}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
