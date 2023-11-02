type SearchBarDropDownProps = {
  onChange: (category: string) => void
  label: string
  categories: string[]
}

export const SearchBarDropDown = (my_props: SearchBarDropDownProps) => {
  return (
    <div className='flex justify-end z-50 overflow-visible'>
      <div className='group relative'>
        <button className='bg-slate-400 text-slate-700 font-semibold text-sm py-2 px-4 inline-flex items-center rounded-l-md justify-end'>
          <span className=''>{my_props.label ? my_props.label : 'category'}</span>
          <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </button>
        <ul className='absolute hidden text-gray-700 pt-1 group-hover:block text-sm text-left'>
          {my_props.categories?.map((category, i) => (
            <li className='' key={category}>
              <a
                onClick={() => my_props.onChange(category)}
                className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
                href='#'
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
