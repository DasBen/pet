import {BaseSchema} from './baseSchema'

export interface BaseProfile extends BaseSchema {
    type: string
    name: string
    profileImageUrl: string
    bannerImageUrl: string
    description?: string
    followers?: number
    following?: number
    birthday?: string
}
