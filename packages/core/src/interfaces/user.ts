import {BaseProfile} from './baseProfile'
import {CaretakerProfile} from './careTaker'

export interface UserProfile extends BaseProfile {
    ownedAnimals?: string[]
    address?: string
    careTakerProfile?: CaretakerProfile
}
