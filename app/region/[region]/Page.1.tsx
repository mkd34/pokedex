'use client'
import { PokemonCard, ShinyToggle } from '@/app/components'
import { PokemonPicture } from '@/app/components/PokemonPicture'
import { RegionalButtons } from '@/app/components/RegionalButtons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PokemonResponse } from '../../types'
import { getRegionDex } from './page'

export default function Page({ params }: { params: { name: string } }) {
  const [showShiny, setShowShiny] = useState(false)
  const [data, setData] = useState<PokemonResponse>()

  useEffect(() => {
    getRegionDex(params.name).then((pokemon) => setData(pokemon))
  }, [])

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
      <RegionalButtons onClick={() => handleRegionClick('orignal-johto')} />
      <div className='p-3'>
        <ShinyToggle isOn={showShiny} onToggle={() => setShowShiny(!showShiny)} />
        <div className='grid gap-10 p-10 grid-cols-3'>
          {data?.pokemon_entries.map((pokemon, i) => {
            return (
              <PokemonCard
                pokemon={pokemon.pokemon_species.name}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  showShiny ? 'shiny/' : ''
                }${i + 1}.png`}
                key={pokemon.pokemon_species.name}
                onClick={() => handlePokemonClick(pokemon.pokemon_species.name)}
              />
            )
          })}
        </div>
        <PokemonPicture />
      </div>
    </div>
  )
}
