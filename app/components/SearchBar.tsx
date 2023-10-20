import { useEffect, useState } from 'react'

type SearchBarDropDownProps = {
  childToParent: Function
  label: string
}

export const SearchBarDropDown = (my_props: SearchBarDropDownProps) => {
  const [childData, setChildData] = useState<string>()

  useEffect(() => {
    my_props.childToParent(childData)
  }, [childData])
  return (
    <div className='group relative'>
      <button className='bg-slate-400 text-slate-700 font-semibold text-sm py-2 px-4 inline-flex items-center w-full rounded-l-md'>
        <span className=''>{my_props.label ? my_props.label : 'select category'}</span>
        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>
      <ul className='absolute hidden text-gray-700 pt-1 group-hover:block text-sm text-left w-full'>
        <li className=''>
          <a
            onClick={() => {
              setChildData('pokemon')
            }}
            className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            pokemon
          </a>
        </li>
        <li className=''>
          <a
            onClick={() => {
              setChildData('region')
            }}
            className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
            href='#'
          >
            region
          </a>
        </li>
      </ul>
    </div>
  )
}
