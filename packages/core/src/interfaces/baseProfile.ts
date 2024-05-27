export interface BaseProfile {
    id?: string
    type: string
    name: string
    profileImageUrl: string
    bannerImageUrl: string
    description?: string
    followers?: number
    following?: number
    birthday?: string
    createdAt?: number
    updatedAt?: number
    deleteAt?: number
}
