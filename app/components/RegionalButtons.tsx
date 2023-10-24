import { MouseEventHandler } from 'react'
import { PokemonDetailedResponse } from '../[name]/page'

type RegionalButtonsProps = {
  onClick: MouseEventHandler<HTMLDivElement>
  name: string
}

type DropDownButtonProps = {
  childToParent: Function
  pageType?: string // the drop-down buttons need to send different search queries back depending on where they are used
  pokemon?: PokemonDetailedResponse
}

export const RegionalButtons = (region: RegionalButtonsProps) => {
  return (
    <div onClick={region.onClick}>
      <button
        type='button'
        className='hover:text-slate-800 focus:ring-4 font-medium rounded-lg text-sm px-3.5 py-2.5 mr-2 mb-2 bg-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-pink-400 drop-shadow-sm text-slate-200'
      >
        {region.name}
      </button>
    </div>
  )
}
