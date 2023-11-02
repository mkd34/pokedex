'use client'

import { getDamageClassIconFormat, getTypeBgColor, getTypeTextColor } from '@/app/util/FormatUtilities'
import { Move, MoveClient, MoveFlavorText, PastMoveStatValues } from 'pokenode-ts'
import { ChangeEvent, useEffect, useState } from 'react'

const api = new MoveClient()
export default function Page({ params }: { params: { name: string } }) {
  const [data, setData] = useState<Move>()
  const [dex, setDex] = useState<string>()
  const [accuracyChange, setAccuracyChange] = useState<number>()
  const [powerChange, setPowerChange] = useState<number>()
  const [ppChange, setPpChange] = useState<number>()

  useEffect(() => {
    api.getMoveByName(params.name).then((pokemon) => setData(pokemon as Move))
  })

  const typeColor = getTypeBgColor(data?.type.name) + ' ' + getTypeTextColor(data?.type.name)
  const damageClassColor = getDamageClassIconFormat(data?.damage_class?.name)

  const dexesWithChanges: string[] = []

  const handleStatChanges = (stats: PastMoveStatValues) => {
    stats.accuracy ? setAccuracyChange(stats.accuracy) : null
    stats.power ? setPowerChange(stats.power) : null
    stats.pp ? setPpChange(stats.pp) : null
  }

  const handlePastValues = (versionGroup: string) => {
    return data?.past_values.forEach((value: PastMoveStatValues) =>
      value.version_group.name.includes(versionGroup) ? handleStatChanges(value) : console.log('no')
    )
  }

  const handleDexSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setDex(e.target.value)
    setAccuracyChange(undefined)
    setPowerChange(undefined)
    setPpChange(undefined)
    dexesWithChanges.forEach((value: string) => {
      e.target.value.includes(value) ? handlePastValues(value) : null
    })
  }

  data?.past_values.forEach((value: PastMoveStatValues) => dexesWithChanges.push(value.version_group.name))

  return (
    <div className='h-screen'>
      <div className='m-2 font-mono text-slate-100 bg-slate-700 rounded-lg drop-shadow-sm z-0 p-2 w-fit max-w-prose'>
        <div className='grid grid-rows-2'>
          <div className='gap-2 grid grid-cols-3'>
            <div className='text-2xl text-slate-50'>{params.name.replace(/-/g, ' ')}</div>
            <div className='flex gap-2'>
              <div className={`inline w-fit h-fit ${typeColor} rounded-sm p-1 text-xs drop-shadow-sm`}>
                {data?.type.name}
              </div>
              <div className={`inline w-fit h-fit ${damageClassColor} rounded-sm p-1 text-xs drop-shadow-sm`}>
                {data?.damage_class?.name}
              </div>
            </div>
            <div className='fixed right-3'>{data?.pp + ' '}pp</div>
          </div>
          <div className='italic text-xs'>{data?.effect_entries.at(0)?.short_effect}</div>
        </div>
        <div className='grid grid-cols-2 text-xl ml-2'>
          <div>power: {data?.power ?? '--'}</div>
          <div>accuracy: {data?.accuracy ?? '--'}</div>
        </div>
        <div className='p-1'>
          <div className='bg-slate-800 w-fit rounded-t-md px-2'>effect:</div>
          <div className='bg-slate-800 rounded-b-md p-2 drop-shadow-sm'>{data?.effect_entries.at(0)?.effect}</div>
        </div>
        <div className='text-lg mt-2 ml-2'>changes</div>
        <div className='p-2'>
          <select
            name='dexes'
            id='dexes'
            onChange={(e) => handleDexSelect(e)}
            className='text-slate-900 bg-slate-50 ml-2'
          >
            {data?.flavor_text_entries
              .filter((value: MoveFlavorText) => value.language.name.includes('en'))
              .map((entry) => (
                <option value={entry.version_group.name} key={entry.version_group.name}>
                  {entry.version_group.name}
                </option>
              ))}
          </select>
          <div className='bg-slate-800 w-fit px-2 rounded-t-md mt-1'>flavor text:</div>
          <div className='bg-slate-800 p-2 rounded-b-md'>
            {data?.flavor_text_entries
              .filter((value: MoveFlavorText) => value.language.name.includes('en'))
              .filter((value: MoveFlavorText) => value.version_group.name.includes(dex ?? 'gold-silver'))
              .map((entry) => entry.flavor_text)}
          </div>
        </div>
        <div className={`bg-orange-500 ${ppChange ? 'w-fit p-2 rounded-md ml-2' : 'w-0'}`}>
          {ppChange ? 'pp changed from' : ''} {ppChange}
        </div>
        <div className={`bg-orange-500 ${powerChange ? 'w-fit p-2 rounded-md ml-2' : 'w-0'}`}>
          {powerChange ? 'power changed from' : ''} {powerChange}
        </div>
        <div className={`bg-orange-500 ${accuracyChange ? 'w-fit p-2 rounded-md ml-2' : 'w-0'}`}>
          {accuracyChange ? 'accuracy changed from' : ''} {accuracyChange}
        </div>
      </div>
    </div>
  )
}
