export interface BaseProfile {
    id?: string
    createdAt?: number
    updatedAt?: number
    deleteAt?: number
    type: string
    name: string
    profileImageUrl: string
    bannerImageUrl: string
    description?: string
    followers?: number
    following?: number
    birthday?: string
}
