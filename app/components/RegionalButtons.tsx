import { MouseEventHandler, useEffect, useState } from 'react'
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

export const DropDownButtonGen1 = (my_props: DropDownButtonProps) => {
  const [childData, setChildData] = useState<string>()

  useEffect(() => {
    my_props.childToParent(childData)
  }, [childData])

  return (
    <div className='group inline-block relative'>
      <button className='bg-slate-700 text-slate-200 font-semibold text-base py-2 px-4 rounded inline-flex items-center'>
        <span className='mr-1'>gen 1</span>
        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>
      <ul className='absolute hidden text-gray-700 pt-1 group-hover:block text-sm text-left'>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('red') : setChildData('pokedex/2'))}
            className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            red/blue
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('yellow') : setChildData('pokedex/2'))}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            yellow
          </a>
        </li>
      </ul>
    </div>
  )
}

export const DropDownButtonGen2 = (my_props: DropDownButtonProps) => {
  const [childData, setChildData] = useState<string>()

  useEffect(() => {
    my_props.childToParent(childData)
  }, [childData])

  return (
    <div className='group inline-block relative'>
      <button className='bg-slate-700 text-slate-200 font-semibold text-base py-2 px-4 rounded inline-flex items-center'>
        <span className='mr-1'>gen 2</span>
        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>
      <ul className='absolute hidden text-gray-700 pt-1 group-hover:block text-sm text-left'>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('gold') : setChildData('pokedex/3'))}
            className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            gold/silver
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('crystal') : setChildData('pokedex/3'))}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            crystal
          </a>
        </li>
      </ul>
    </div>
  )
}

export const DropDownButtonGen3 = (my_props: DropDownButtonProps) => {
  const [childData, setChildData] = useState<string>()

  useEffect(() => {
    my_props.childToParent(childData)
  }, [childData])

  return (
    <div className='group inline-block relative'>
      <button className='bg-slate-700 text-slate-200 font-semibold text-base py-2 px-4 rounded inline-flex items-center'>
        <span className='mr-1'>gen 3</span>
        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>
      <ul className='absolute hidden text-gray-700 pt-1 group-hover:block text-sm text-left'>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('ruby') : setChildData('pokedex/4'))}
            className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            ruby/sapphire
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('emerald') : setChildData('pokedex/4'))}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            emerald
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('firered') : setChildData('pokedex/2'))}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            fire red/leaf green
          </a>
        </li>
      </ul>
    </div>
  )
}

export const DropDownButtonGen4 = (my_props: DropDownButtonProps) => {
  const [childData, setChildData] = useState<string>()

  useEffect(() => {
    my_props.childToParent(childData)
  }, [childData])

  return (
    <div className='group inline-block relative'>
      <button className='bg-slate-700 text-slate-200 font-semibold text-base py-2 px-4 rounded inline-flex items-center'>
        <span className='mr-1'>gen 4</span>
        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>
      <ul className='absolute hidden text-gray-700 pt-1 group-hover:block text-sm text-left'>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('diamond') : setChildData('pokedex/4'))}
            className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            diamond/pearl
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('platinum') : setChildData('pokedex/6'))}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            platinum
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('heartgold') : setChildData('pokedex/7'))}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            heart gold/soul silver
          </a>
        </li>
      </ul>
    </div>
  )
}

export const DropDownButtonGen5 = (my_props: DropDownButtonProps) => {
  const [childData, setChildData] = useState<string>()

  useEffect(() => {
    my_props.childToParent(childData)
  }, [childData])

  return (
    <div className='group inline-block relative'>
      <button className='bg-slate-700 text-slate-200 font-semibold text-base py-2 px-4 rounded inline-flex items-center'>
        <span className='mr-1'>gen 5</span>
        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>
      <ul className='absolute hidden text-gray-700 pt-1 group-hover:block text-sm text-left'>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('black') : setChildData('pokedex/8'))}
            className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            black/white
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('black-2') : setChildData('pokedex/9'))}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            black 2/white 2
          </a>
        </li>
      </ul>
    </div>
  )
}
export const DropDownButtonGen6 = (my_props: DropDownButtonProps) => {
  const [childData, setChildData] = useState<string>()

  useEffect(() => {
    my_props.childToParent(childData)
  }, [childData])

  return (
    <div className='group inline-block relative'>
      <button className='bg-slate-700 text-slate-200 font-semibold text-base py-2 px-4 rounded inline-flex items-center'>
        <span className='mr-1'>gen 6</span>
        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>
      <ul className='absolute hidden text-gray-700 pt-1 group-hover:block text-sm text-left'>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('x') : setChildData('pokedex/12'))}
            className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            x/y
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('omega-ruby') : setChildData('pokedex/15'))}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            omega ruby/alpha sapphire
          </a>
        </li>
      </ul>
    </div>
  )
}

export const DropDownButtonGen7 = (my_props: DropDownButtonProps) => {
  const [childData, setChildData] = useState<string>()

  useEffect(() => {
    my_props.childToParent(childData)
  }, [childData])

  return (
    <div className='group inline-block relative'>
      <button className='bg-slate-700 text-slate-200 font-semibold text-base py-2 px-4 rounded inline-flex items-center'>
        <span className='mr-1'>gen 7</span>
        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>
      <ul className='absolute hidden text-gray-700 pt-1 group-hover:block text-sm text-left'>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('sun') : setChildData('pokedex/16'))}
            className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            sun/moon
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('ultra-sun') : setChildData('pokedex/21'))}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            ultra sun/ultra moon
          </a>
        </li>
        <li className=''>
          <a
            onClick={() =>
              my_props.pageType === 'detail' ? setChildData('lets-go-pikachu') : setChildData('pokedex/')
            }
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            lets go pikachu/lets go eevee
          </a>
        </li>
      </ul>
    </div>
  )
}

export const DropDownButtonGen8 = (my_props: DropDownButtonProps) => {
  const [childData, setChildData] = useState<string>()

  useEffect(() => {
    my_props.childToParent(childData)
  }, [childData])

  return (
    <div className='group inline-block relative'>
      <button className='bg-slate-700 text-slate-200 font-semibold text-base py-2 px-4 rounded inline-flex items-center'>
        <span className='mr-1'>gen 8</span>
        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>
      <ul className='absolute hidden text-gray-700 pt-1 group-hover:block text-sm text-left'>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('sword') : setChildData('pokedex/27'))}
            className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            sword/shield
          </a>
        </li>
        <li className=''>
          <a
            onClick={() =>
              my_props.pageType === 'detail' ? setChildData('legends-arceus') : setChildData('pokedex/30')
            }
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            legends arceus
          </a>
        </li>
      </ul>
    </div>
  )
}
export const DropDownButtonGen9 = (my_props: DropDownButtonProps) => {
  const [childData, setChildData] = useState<string>()

  useEffect(() => {
    my_props.childToParent(childData)
  }, [childData])

  return (
    <div className='group inline-block relative'>
      <button className='bg-slate-700 text-slate-200 font-semibold text-base py-2 px-4 rounded inline-flex items-center'>
        <span className='mr-1'>gen 9</span>
        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>
      <ul className='absolute hidden text-gray-700 pt-1 group-hover:block text-sm text-left'>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('scarlet') : setChildData('pokedex/31'))}
            className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            scarlet/violet
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('teal-mask') : setChildData('pokedex/32'))}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            teal mask
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => (my_props.pageType === 'detail' ? setChildData('indigo-disk') : setChildData('pokedex/33'))}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            indigo disk
          </a>
        </li>
      </ul>
    </div>
  )
}
