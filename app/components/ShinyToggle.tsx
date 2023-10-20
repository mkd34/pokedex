import { ChangeEvent } from 'react'
import { PiMagicWand } from 'react-icons/pi'
import { TbWandOff } from 'react-icons/tb'
type ShinyToggleProps = {
  onToggle: (event: ChangeEvent<HTMLInputElement>) => void
  isOn: boolean
}

export const ShinyToggle = (props: ShinyToggleProps) => {
  return (
    <div>
      <label className='relative inline-flex items-center cursor-pointer'>
        <input type='checkbox' checked={props.isOn} className='sr-only peer' onChange={props.onToggle} />

        <div className="w-11 h-6 bg-slate-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-400"></div>
        <div className='absolute text-sm text-pink-400 left-1'>
          <PiMagicWand />
        </div>
        <div className='absolute text-sm text-slate-500 right-1'>
          <TbWandOff />
        </div>
      </label>
    </div>
  )
}
