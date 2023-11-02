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

export const getTypeTextColor = (type: string | undefined) => {
  switch (type) {
    case 'grass':
      return 'text-green-900'
      break
    case 'poison':
      return 'text-fuchsia-200'
      break
    case 'fire':
      return 'text-orange-200'
      break
    case 'water':
      return 'text-blue-200'
      break
    case 'bug':
      return 'text-lime-100'
      break
    case 'flying':
      return 'text-violet-200'
      break
    case 'electric':
      return 'text-yellow-100'
      break
    case 'fairy':
      return 'text-pink-100'
      break
    case 'psychic':
      return 'text-pink-200'
      break
    case 'dark':
      return 'text-stone-300'
      break
    case 'steel':
      return 'text-indigo-700'
      break
    case 'rock':
      return 'text-amber-200'
      break
    case 'fighting':
      return 'text-rose-300'
      break
    default: // normal
      return 'text-stone-200'
      break
  }
}

export const getTypeIconFormat = (name: string | undefined) => {
  return getTypeBgColor(name) + ' ' + getTypeTextColor(name)
}

export const getDamageClassBgColor = (name: string | undefined) => {
  switch (name) {
    case 'physical':
      return 'bg-orange-600'
      break
    case 'special':
      return 'bg-blue-600'
      break
    default: // status
      return 'bg-gray-600'
      break
  }
}

export const getDamageClassTextColor = (name: string | undefined) => {
  switch (name) {
    case 'physical':
      return 'text-orange-100'
      break
    case 'special':
      return 'text-blue-100'
      break
    default: // status
      return 'text-gray-50'
      break
  }
}

export const getDamageClassIconFormat = (name: string | undefined) => {
  return getDamageClassBgColor(name) + ' ' + getDamageClassTextColor(name)
}
