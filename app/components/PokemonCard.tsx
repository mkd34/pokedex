import { MouseEventHandler } from 'react'

type PokemonCardProps = {
  pokemon: string
  image?: string
  key?: React.Key
  onClick: MouseEventHandler<HTMLDivElement>
}
// type PokemonCardProps = {
//   pokemon: Pokemon
//   image?: string
//   key?: React.Key
//   onClick: MouseEventHandler<HTMLDivElement>
// }

export const PokemonCard = ({ onClick, image, pokemon }: PokemonCardProps) => {
  return (
    <div className='drop-shadow-lg text-slate-300 font-mono hover:cursor-pointer'>
      <div
        onClick={onClick}
        className='bg-slate-700 p-3 rounded-lg border-2 h-fit max-w-fit border-slate-700 drop-shadow-sm hover:bg-slate-800 hover:text-slate-50 hover:border-pink-400'
      >
        <img src={image} alt={pokemon} className='p-3 bg-slate-900 rounded-lg' />
        <div className='mt-2 flex justify-end text-center'>{pokemon}</div>
      </div>
    </div>
  )
}
// export const PokemonCard = ({ onClick, image, pokemon }: PokemonCardProps) => {
//   return (
//     <div onClick={onClick} className='bg-slate-600 w-fit p-3 rounded-lg border-2 border-yellow-100'>
//       <img src={image} alt={pokemon.name} className='p-3 bg-slate-900 w-40 border-2 border-slate-300' />
//       <h1 className='text-lg text-center p-2'>{pokemon.name}</h1>
//       <h1>{pokemon.height}</h1>
//       <h1>{pokemon.weight}</h1>
//     </div>
//   )
// }
