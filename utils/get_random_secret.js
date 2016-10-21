import { times, random } from 'lodash'

const dict = 'qwertyuiopasdfghjklzxcvbnm1234567890_'

export default function getRandomSecret(){
  return times(32, () => dict[random(dict.length-1, false)]).join('')
}
