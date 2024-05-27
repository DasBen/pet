export interface Profile {
    id: string
    profileImageUrl: string
    bannerImageUrl: string
    name: string
    description?: string
    followers: number
    monthlyFundingGoal?: number
    monthlyFundingCurrent?: number
    lifetimeFundingGoal?: number
    lifetimeFundingCurrent?: number
    animalType: string
    birthday?: string
    location?: string
    mother?: Profile
    father?: Profile
    ownerId?: string
    careTakerId?: string
    locationId?: string
    siblings?: Profile[]
    children?: Profile[]
}
