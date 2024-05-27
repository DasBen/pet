import {Animal} from './animal'
import {BaseProfile} from './baseProfile'
import {CaretakerProfile} from './careTaker'

export interface UserProfile extends BaseProfile {
    ownedAnimals?: Animal[]
    address?: string
    careTakerProfile?: CaretakerProfile
}
