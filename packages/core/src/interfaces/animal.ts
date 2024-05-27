import {BaseProfile} from './baseProfile'
import {CaretakerProfile} from './careTaker'
import {Organization} from './organization'
import {UserProfile} from './user'

// @todo needs to be updated with ids which need to be fetched
export interface Animal extends BaseProfile {
    animalType: string
    monthlyFundingGoal?: number
    monthlyFundingCurrent?: number
    lifetimeFundingGoal?: number
    lifetimeFundingCurrent?: number
    location?: string
    mother?: Animal
    father?: Animal
    siblings?: Animal[]
    children?: Animal[]
    owner?: UserProfile
    careTaker?: CaretakerProfile
    organization?: Organization
}
