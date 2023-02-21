import forestTSV from '@/assets/data/forest_v4.tsv'
import letseeTSV from '@/assets/data/letsee_v4.tsv'

export const MAP_MODE = 'letsee'
export const MAP_INFO = {
  forest: { lat: 37.54441138490005, lon: 127.04047614137232, zoom: 4, tsv: forestTSV },
  letsee: { lat: 37.506031, lon: 127.058292, zoom: 3, tsv: letseeTSV }
}


export const IS_AR = {
  'TRUE': true,
  'FALSE': false
}

export const CHARACTER_TYPE = {
  CAT : 'CAT',
  DOG : 'DOG',
  PANDA : 'PANDA'
  
}


