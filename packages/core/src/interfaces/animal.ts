import {BaseProfile} from './baseProfile'

export interface Animal extends BaseProfile {
    animalType: string
    monthlyFundingGoal?: number
    lifetimeFundingGoal?: number
    location?: string
    motherId?: string
    fatherId?: string
    siblings?: string[]
    children?: string[]
    ownerId?: string
    caretakerId?: string
    organizationId?: string
}

export type AnimalPatch = Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>

export function removeReadOnlyFields(animal: Animal): AnimalPatch {
    const {id, createdAt, updatedAt, ...rest} = animal
    return rest
}